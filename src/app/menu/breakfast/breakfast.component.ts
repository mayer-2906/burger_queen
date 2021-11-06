import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Producto } from '../../interfaces/app.interface';

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css']
})
export class BreakfastComponent implements OnInit {

  prodBreakfast:Producto[];
  id:number=0;
  @Output() onEventEmitter: EventEmitter<number> = new EventEmitter();
  constructor(private service:AppService) {
    this.prodBreakfast=this.service.getBreakFast();
  }

  ngOnInit(): void {
  }

  agregarProducto(e:any){
    this.id=e.target.id;
    this.onEventEmitter.emit(this.id);
    //console.log(this.id);

  }

}
