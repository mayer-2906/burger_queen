import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Mesa } from '../interfaces/app.interface'
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  mesas:Observable<Mesa[]>;
  orden:any;
  verModal:boolean=false;
  constructor(private appService: AppService) {
    this.mesas=this.appService.getMesas();
   }

  ngOnInit(): void {
    //console.log(this.mesas);

  }


  savetable(mesa:number) {
    localStorage.setItem("numMesa",mesa.toString())
     //this.appService.actualizarEstadoMesa(mesa);
  }

  /*consultarOrden(numberOrden:string){
    console.log("voy a cosultar la orden: ",numberOrden);
    this.appService.ordenes.subscribe(ordenes=>{
      ordenes.forEach(orden=>{
        if(orden.numOrder==numberOrden){
          this.orden=orden;
          console.log('soy la orden: ',numberOrden,orden);
          this.verModal=true;
        }
      })
    })
  }*/

  consultarOrden(numberOrden:string){
    localStorage.setItem("orden",numberOrden);
    this.verModal=true;
  }

  cerrarModal(opcion:boolean){
    this.verModal=opcion;
  }

}
