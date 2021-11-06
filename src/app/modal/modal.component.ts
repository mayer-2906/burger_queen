import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../services/app.service';
//import {} from ''

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css','../menu/orden/orden.component.css']
})
export class ModalComponent implements OnInit {

  orden:any={};
  @Output() onEventEmitter: EventEmitter<boolean> = new EventEmitter();
  constructor(private service: AppService) {
   this.crearOrden();
  }

  ngOnInit(): void {
  }

  crearOrden(){
    let numberOrden=localStorage.getItem("orden");
    let ord:any={};
    //console.log(numberOrden)
    this.service.ordenes.subscribe(ordenes=>{
      ordenes.forEach(orden=>{
        if(orden.numOrder==numberOrden){
          this.orden=orden;
          //console.log('soy la orden: ',numberOrden,orden);
        }
      })
    })
    //return ord;
  }

  getSubtotal(precio:number,cantidad:number):number{
    return precio*cantidad;
  }

  cerrar(){
    this.onEventEmitter.emit(false);
  }

}
