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
  constructor(private appService: AppService) {
    this.mesas=this.appService.getMesas();
   }

  ngOnInit(): void {
    //console.log(this.mesas);

  }


  savetable(mesa:number) {
    localStorage.setItem("numMesa",mesa.toString())
     this.appService.actualizarEstadoMesa(mesa);
  }

  consultarOrden(orden:string){
    console.log("voy a cosultar la orden: ",orden);
    this.orden=this.appService.ordenes.pipe(
      tap(console.log),
      map((ordenes:any)=>ordenes.filter((orden:any)=> orden.numOrder==orden)),
      tap(console.log)
    );

  }

}
