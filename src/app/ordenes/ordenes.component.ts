import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenesListas:Observable<any[]>;
  constructor(private service: AppService) {
    this.ordenesListas=this.service.ordenes
    .pipe(
      tap(console.log),
      map((ordenes:any)=>ordenes.filter((orden:any)=> orden.estado=="preparado")),
      tap(console.log)
    );
  }

  ngOnInit(): void {
  }

}
