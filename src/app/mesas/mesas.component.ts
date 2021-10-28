import { Component, OnInit } from '@angular/core';
import { Mesa } from '../interfaces/app.interface'
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  numPrueba:number=4;
  mesas:Mesa[];
  constructor(private appService: AppService) {
    this.mesas=this.appService.getMesas();
   }

  ngOnInit(): void {
  }

  savetable(mesa:number) {
    localStorage.setItem("numMesa",mesa.toString())
     this.appService.actualizarEstadoMesa(mesa);
  }

  consultarOrden(mesa:number){
    console.log("voy a cosultar la orden");
    
  }

}
