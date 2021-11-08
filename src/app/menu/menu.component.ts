import { Component, Input, Output } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() numMesa:number=0;
  codProduct:number=0;

  showBreakfast:boolean=true;

  constructor(private service:AppService) { }

  showmenu(id:string){
    switch(id){
      case 'b':this.showBreakfast=true;
                break;
      case 'l':this.showBreakfast=false;
                break;
    }

  }

  itemAgregar(e:any){
    //console.log("estoy en el menu: ",e);
    this.codProduct=e;
    this.service.agregarItem(this.codProduct,1);
  }

  itemAgregar2(e:any){
    //console.log("estoy en el menu: ",e);
    this.codProduct=e;
    this.service.agregarItem(this.codProduct,2);

  }

}
