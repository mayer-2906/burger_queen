import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/interfaces/app.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {

  menuLunch:Producto[]=[];
  menuAdicionales:Producto[]=[];
  id:number=0;
  agregados:boolean=false;
  @Output() onEventEmitter: EventEmitter<number> = new EventEmitter();
  constructor(private service:AppService) {
    this.menuLunch=this.service.getLunch();
    this.menuAdicionales=this.service.getAdicionales();
    //console.log(this.menuLunch);

  }

  ngOnInit(): void {
  }

  agregarProducto(e:any){
    this.id=e.target.id;
    this.onEventEmitter.emit(this.id);
    //console.log(this.id);

  }

  mostrarAdicionales():boolean{
    let mostrar:boolean=false;
    this.service.getItems().forEach(e=>{
      if(e.id>=7 && e.id<=9){
        mostrar=true
      }
    })
    return mostrar;
  }

}
