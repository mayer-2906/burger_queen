import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc,
         setDoc,
         getFirestore,
         updateDoc,
         deleteDoc,
         collection,
         query,
         where,
         getDocs,
         enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {Observable} from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Mesa, Producto, Item, Order } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private mesas:Observable<any[]>;
  private breakfast!: Producto[];
  private lunch!: Producto[];
  private adicionales!:Producto[];
  private items:Item[]=[];
  private pedidos:Observable<any[]>;
  public ordenes:Observable<any[]>;
  private contadorPedidos:string="";
  private bd:any;
  private auth:any;
  private userValido:boolean=false;

  constructor(private db: AngularFirestore){

    //this.mesas=this.crearMesas();ç
    this.mesas=this.db.collection('mesas').valueChanges();
    this.cargarProductos();
    this.ordenes=this.db.collection('order').valueChanges();
    this.pedidos=this.db.collection('facturas').valueChanges();
    this.bd=getFirestore();
    this.contadorPedidos=this.generateRandomString();
    this.auth=getAuth();
  }

  autenticar(correo: string, password: string) {
    console.log();

    signInWithEmailAndPassword(this.auth, correo, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user);

      const user = userCredential.user;
      this.userValido=true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
     // ..
    });
    return this.userValido;
  }

  cargarProductos = () =>{
    fetch("./assets/db/menu.json")
    .then(res=>res)
    .then(res=>{
      //console.log(res);
      return res.json();
    })
    .then(data=>{
      //console.log(data);
      this.breakfast=data.breakFast;
      this.lunch=data.lunch;
      this.adicionales=data.adicionales;
      //console.log(this.breakfast)
    })
  }

  getAdicionales() {
    return this.adicionales;
  }

  getBreakFast() {
    return this.breakfast;
  }

  getLunch () {
    return this.lunch;
  }

  getMesas():Observable<Mesa[]> {
    return this.mesas;
  }


  agregarItem(cod:number, menu:number){
    let newproducto;
    let newItem:Item;
    let item2=this.items.filter(item=>item.id==cod);
    if(item2.length==0){
      if(menu===1){
        newproducto=this.breakfast.find(e=>e.codigo==cod);
        //console.log("estoy en el servicio",newproducto);
        newItem=new Item(cod,newproducto!.nombre,1,newproducto!.precio);
        this.items.push(newItem);
        //console.log(this.items);
      }
      else{
        if(cod>12){
          newproducto=this.adicionales.find(e=>e.codigo==cod)
        }
        else{
          newproducto=this.lunch.find(e=>e.codigo==cod);
        }
        newItem=new Item(cod,newproducto!.nombre,1,newproducto!.precio);
        this.items.push(newItem);
      }

    } else {
      this.agregarCantidadAItem(cod);
    }

  }

  agregarCantidadAItem(codProd:number){
   this.items.find(item=>{
     if(item.id==codProd)
       item.cantidad++;
       item.subtotal=item.getSubtotal();
    })
  }

  disminuirCantidadAItem(codProd:number){

    let itemUpdate:any=this.items.find(item=>item.id===codProd);
    if(itemUpdate.cantidad>1){
      itemUpdate.cantidad--;
      itemUpdate.subtotal=itemUpdate.getSubtotal();
    }
    else{
      const num=this.items.indexOf(itemUpdate);
      //console.log("estoy en la posicion: ",num)
      this.items.splice(num,1);
    }
   }

  getItems(){
    return this.items;
  }

  async actualizarEstadoMesa(numMesa:number,estado:string){
    //let mesaBuscada:any=this.mesas.pipe(
    //  map((mesas)=>mesas.find(mesa=>mesa.numero==numMesa)),
    //tap(console.log),
    //map((mesa)=>mesa.estado=mesaBuscada.estado=='libre'? 'ocupado':'libre'),
    //tap(console.log)
    //)
    let numeroOrden="";
    if(estado=="ocupado"){
      numeroOrden=this.contadorPedidos;
    }
    const mesa = doc(this.bd, "mesas", '00'+numMesa.toString())
      await updateDoc(mesa,{
        estado:estado,
        orden: numeroOrden
      })
      this.contadorPedidos=this.generateRandomString();
  }

  pagarOrden(numOrden:string){
    let newOrden={};
    this.ordenes.subscribe((ordenes) => {
      ordenes.forEach(async (orden) => {
        if (orden.numOrder == numOrden) {
          newOrden = orden;
          console.log(newOrden);
          orden.estado="pagado";
          //console.log('soy la orden: ',numberOrden,orden);
          this.actualizarEstadoMesa(orden.numMesa,"libre");
          await deleteDoc(doc(this.bd, "order", orden.numOrder));
          setDoc(doc(this.bd, "facturas", numOrden), orden)
        }
      });
    })

  }

  async actualizarEstadoOrden(numOrden:string, estad:string,numMesa?:number){
    const orden = doc(this.bd, "order", numOrden);

    // Set the "estado" field of the orden con #orden 'numOrden'
    if(estad=="preparado"){
      await updateDoc(orden, {
        estado: estad,
        fechaTerminado:Date.now(),
      });
      alert("la orden de la mesa: "+numMesa+" esta lista para entregar")
    }
    else{
      await updateDoc(orden, {
        estado: estad,
      });
    }

  }

  generateRandomString(){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= Math.floor(Math.random() * 100)+Math.random().toString(36).substring(2,5)+"-"+Math.floor(Math.random() * 10);

    return result1;
  }


  getContadorPedidos(){
    return this.contadorPedidos;
  }

  eliminaritems(){
    this.items=[];
  }

  async agregarOrden(numMmesa:number,cliente:string,items:Item[], total: number){

    const hora=Date.now();
    console.log(typeof(hora));

    const newOrder={
      numOrder: this.contadorPedidos,
      numMesa: numMmesa,
      cliente: cliente,
      items:items.map(item=>item.toObject()),//(items.map(e=>Object.entries(e))).toString(),
      total: total,
      estado: 'ordenado',
      fecha:hora,
      fechaTerminado:0,
    }

     setDoc(doc(this.bd, "order", this.contadorPedidos), newOrder)
      this.items=[];
      this.actualizarEstadoMesa(numMmesa,"ocupado");

  }

  consultarEstadoOrden(numberOrden:string){

    let ordenBuscada:any=this.ordenes.pipe(
        tap(console.log),
        map((ordenes:any)=>ordenes.filter((orden:any)=> orden.estado!="preparado")),
        tap(console.log)
    )

    console.log(ordenBuscada);

  }


  //getOrdenes():Observable<any[]>{
  //  return this.ordenes;
  //}

}

