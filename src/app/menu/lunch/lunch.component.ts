import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/app.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {

  menuLunch:Producto[]=[];
  constructor(private service:AppService) { 
    this.menuLunch=this.service.getLunch();
    //console.log(this.menuLunch);
    
  }

  ngOnInit(): void {
  }

}
