import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo:string="";
  password:string="";
  user:any;
  constructor(private service:AppService) { }

  ngOnInit(): void {
  }

  actualizarCorreo(evento:any){
    this.correo=evento.target.value;
    console.log(this.correo);

  }

  actualizarPassword(evento:any){
    this.password=evento.target.value;
    console.log(this.password);

  }
  autenticar(){
    this.user=this.service.autenticar(this.correo,this.password);
    if(this.user){
      window.location.pathname="/usuarios";
    }
  }
}
