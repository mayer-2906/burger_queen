import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Mesa, Producto } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private mesas:Mesa[];
  private breakfast: Producto[]=[];

  constructor(){
    this.mesas=this.crearMesas();
    this.breakfast=this.cargarProductos();
  }

  cargarProductos = (): Producto[] =>{
    let menuDesayuno:Producto[]=[];
    fetch("./assets/menu.json")
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      menuDesayuno= data.breakfast;
    })
    console.log(menuDesayuno);
    return menuDesayuno;
  }

  getMesas = ():Mesa[] => {
    return [...this.mesas];
  }

  crearMesas = (): Mesa[] => {

    //throw new Error('Function not implemented.');
    let tables:Mesa[]=[];
    for(let i=1; i<11;i++){
      tables.push({
        numero:i,
        estado:'libre'
      })
    }
    return tables;
  }
}

