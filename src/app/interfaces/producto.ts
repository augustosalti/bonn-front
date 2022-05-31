export class Producto {

    constructor(
      public id: number,
      public id_cliente: number,
      public id_proveedor: number,
      public id_modelo: number,
      public id_tipo: number,
      public imagen: string,
      public imagen2: string,
      public nombre: string,
      public descripcion: string,
      public precio: number,
      public precio_anterior: number,
      public costo: number,
      public alto: string,
      public ancho: string,
      public profundo: string, 
      public id_color: number,
      public stock: number,
      public activo: number,
      public codigo: number     
    ) {  }
  
  }