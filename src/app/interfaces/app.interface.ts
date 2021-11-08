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

export class Order{
  fecha: number;
  numOrder:string;
  numMesa:number;
  cliente: string;
  items: Item[];
  total: number;
  estado: string;

  constructor(numOrder:string,mesa:number,client:string,itemss:Item[],neto:number,stado:string,fecha:number){
    this.numOrder=numOrder,
    this.numMesa=mesa,
    this.cliente=client,
    this.items=itemss,
    this.total=neto,
    this.estado=stado,
    this.fecha=fecha
  }

  duracionPreparacion():number{
    const tiempoTrancurrido=(Date.now()-this.fecha)*1000;
    return tiempoTrancurrido;
  }

  toObject(){
    return {
      numOrder:this.numOrder,
      numMesa:this.numMesa,
      cliente:this.cliente,
      items: this.items.map(e=>e.toObject),
      total: this.total,
      estado: this.estado
    }
  }
}

export interface Mesa{
  numero: number;
  orden: string;
  estado: string;
}

export interface Producto{
  codigo:number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen?:string;
}



