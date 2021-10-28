import {Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from 'firebase/firestore';
import {Observable} from 'rxjs';
import { Mesa, Producto, Item, Order } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private mesas:Mesa[];
  private breakfast!: Producto[];
  private lunch!: Producto[];
  private items:Item[]=[];
  private pedidos:Observable<any[]>;
  private ordenes:Observable<any[]>;
  private contadorPedidos:number=0;

  constructor(private db: AngularFirestore){
    this.mesas=this.crearMesas();
    this.cargarProductos();
    this.ordenes=this.db.collection('order').valueChanges();
    this.pedidos=this.db.collection('pedidos').valueChanges();

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
      //console.log(this.breakfast)
    })
  }

  getBreakFast() {    
    return this.breakfast;
  }

  getLunch () {
    return this.lunch;
  }

  getMesas():Mesa[] {
    return [...this.mesas];
  }

  crearMesas (): Mesa[] {

    //throw new Error('Function not implemented.');
    let tables:Mesa[]=[];
    for(let i=1; i<10;i++){
      tables.push({
        numero:i,
        estado:'libre'
      })
    }
    return tables;
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
        newproducto=this.lunch.find(e=>e.codigo==cod);
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
    }) 
  }

  disminuirCantidadAItem(codProd:number){
    this.items.find(item=>{
      if(item.id==codProd)
        item.cantidad--;
     })     
     
   }

  getItems(){
    return this.items;
  }

  actualizarEstadoMesa(numMesa:number){
    let mesaBuscada=this.mesas.find(mesa=>mesa.numero==numMesa)
    if(mesaBuscada){
      mesaBuscada.estado=(mesaBuscada.estado=='libre')? 'ocupado':'libre';
    }
    this.contadorPedidos++;
  }

  getContadorPedidos(){
    return this.contadorPedidos;
  }

  eliminaritems(){
    this.items=[];
  }

  agregarOrden(mesa:number,cliente:string,items:Item[], total: number){
    const newOrder={
      numOrder: this.contadorPedidos,
      numMesa: mesa,
      cliente: cliente,
      items:items.map(item=>item.toObject()),//(items.map(e=>Object.entries(e))).toString(),
      total: total,
      estado: 'ordenado',
    }   
    this.db.collection('order').add(newOrder)
    .then(data=>{
      console.log(data.id);
      //items.forEach(e=>{
      //  this.db.collection('order').doc(data.id).collection('items').add(e)
      //  .then(r=>{
      //    console.log(r.id);
      //    
      //  })
      //})
      //this.db.collection('order').doc(data.id).collection('items').add({nombre:'mariela'})
      //this.db.collection('order').doc(data.id).update({items:[]})
      //const newdoc=doc(this.db,'order','items')
    })
    //  items.forEach(e=>{
    //    this.db.collection("order").doc(data.id).collection('items').add(e)
    //    .then(r=>{
    //      console.log(r.id);          
    //    })
    //  })
    ////  this.db.collection("order").doc(data.id).collection('items').add({nombre:'prueba'})
    ////  .then(r=>{
    ////    console.log(r);
    ////    
    ////})
      this.items=[];
    //});
        
  }

}

