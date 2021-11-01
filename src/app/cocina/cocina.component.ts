import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap, map} from 'rxjs/operators';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['../menu/orden/orden.component.css','./cocina.component.css']
})
export class CocinaComponent implements OnInit {

  ordenes:Observable<any[]>;
  constructor(private service:AppService) {
    this.ordenes=this.service.ordenes
    .pipe(
      tap(console.log),
      map((ordenes:any)=>ordenes.filter((orden:any)=> orden.estado!="preparado")),
      tap(console.log)
    );
  }

  ngOnInit(): void {
  }

  prepararOrden(numOrder:string){
    console.log(numOrder);
    this.service.actualizarEstadoOrden(numOrder, 'en preparación');
    //alert("preparando la orden: "+numOrder)
  }

  entregarOrden(numOrder:string){
    console.log(numOrder);
    this.service.actualizarEstadoOrden(numOrder, 'preparado');
    //alert("preparando la orden: "+numOrder)
  }

}
