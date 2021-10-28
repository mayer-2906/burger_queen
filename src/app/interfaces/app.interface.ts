//import { INSPECT_MAX_BYTES } from "buffer";

export class Item{
  id:number;
  producto: string;
  cantidad:number;
  precio: number;
  subtotal: number;

  constructor(cod:number, prod:string, cant:number, precio:number){
    this.id=cod;
    this.producto=prod,
    this.cantidad=cant,
    this.precio=precio,
    this.subtotal=this.getSubtotal();
  }
  getSubtotal():number{
    return this.precio*this.cantidad;
  }

  toObject(){
    return {producto:this.producto,
            cantidad:this.cantidad,
            precio:this.precio
          }
  }

}

export interface Order{
  numOrder:number;
  numMesa:number;
  cliente: string;
  items: Item[];
  total: number;
  estado: string;
}

export interface Mesa{
  numero: number;
  orden?: number;
  estado: string;
}

export interface Producto{
  codigo:number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen?:string;
}



