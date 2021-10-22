import { Component, OnInit } from '@angular/core';
import { Mesa } from '../interfaces/app.interface'
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  mesas:Mesa[];
  constructor(private appService: AppService) {
    this.mesas=this.appService.getMesas();
   }

  ngOnInit(): void {
  }

}
