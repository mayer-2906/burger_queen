import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../services/app.service';
//import {} from ''

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', '../menu/orden/orden.component.css'],
})
export class ModalComponent implements OnInit {
  orden: any = {};
  @Output() onEventEmitter: EventEmitter<boolean> = new EventEmitter();
  constructor(private service: AppService) {
    this.crearOrden();
  }

  ngOnInit(): void {}

  crearOrden() {
    let numberOrden = localStorage.getItem('orden');
    let ord: any = {};
    //console.log(numberOrden)
    this.service.ordenes.subscribe((ordenes) => {
      ordenes.forEach((orden) => {
        if (orden.numOrder == numberOrden) {
          this.orden = orden;
          //console.log('soy la orden: ',numberOrden,orden);
        }
      });
    });
    //return ord;
  }

  getSubtotal(precio: number, cantidad: number): number {
    return precio * cantidad;
  }

  cerrar() {
    this.onEventEmitter.emit(false);
  }

  getTime() {
    let seconds=0;
    if (this.orden.estado != 'preparado') {
      seconds = (Date.now() - this.orden.fecha) / 1000;
    }
    else{
      seconds = (this.orden.fechaTerminado - this.orden.fecha) / 1000;
    }
    console.log(seconds);
      let hour:number = Math.floor(seconds / 3600);
      console.log(hour);

      let hourString = hour < 10 ? "0"+hour : hour;
      let minute = Math.floor((seconds / 60) % 60);
      let minuteString = minute < 10 ? "0"+minute : minute;
      let second = seconds % 60;
      let secondString = second < 10 ? 0 : second;
      return hourString + ':' + minuteString + ':' + Math.floor(second);
  }

  pagar(){
    console.log("voy a pagar: ",this.orden.numOrder );
    this.service.pagarOrden(this.orden.numOrder);
    this.onEventEmitter.emit(false);
  }
}
