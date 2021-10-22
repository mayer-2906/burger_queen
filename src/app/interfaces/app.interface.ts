export interface Item{
  producto: string;
  cantidad:number;
  precio: number;
  subtotal: number;
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



