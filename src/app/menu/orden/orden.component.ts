import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/app.interface';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  mesa:number=0;
  numOrden:string="";
  nombre:string="";  
  items:Item[];
  total:number=0;
  estado:string='pendiente';
  //validPedido:boolean=false;

  constructor(private service: AppService, private router:Router) { 
    this.items=service.getItems();
    this.mesa=Number(localStorage.getItem("numMesa"));
    this.numOrden=service.getContadorPedidos();
    this.calcularTotal();
  }

  ngOnInit(): void {
  }

  calcularTotal():number{
    this.total=this.items.reduce((a,b)=>{return a+b.getSubtotal()},0);    
    //console.log(newTotal);
    return this.total;
  }

  confirmarPedido(){
    if(this.nombre==''|| this.items.length==0){
      alert("Debe ingresar un nombre y agregar un producto")
    } else {
      this.service.agregarOrden(this.mesa,this.nombre,this.items, this.calcularTotal()) 
      this.nombre="";
      //this.validPedido=true; 
    }    
  }
  
  cancelarPedido(){

    this.service.actualizarEstadoMesa(this.mesa);
    this.service.eliminaritems();
    console.log("cancelar");
    
  }

  actualizarNombre(e:any){
    //console.log(e.target.value);    
    let name=e.target.value;
    this.nombre=name;
  }
  
  modificarCantidad(operacion:string,id:number){
    if(operacion=="sumar"){
      this.service.agregarCantidadAItem(id);
     // this.service.getItems()
     
    }
    else{
      this.service.disminuirCantidadAItem(id)
    }
  }
}
