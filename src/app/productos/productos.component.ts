import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../servicios/post.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Producto }    from '../interfaces/producto';
import { LoginService } from 'src/servicios/login.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  items: any;
  page: number = 1;
  pageSize = 5;
  collectionSize = 0;

  proveedores: any[] | undefined;
  modelos: any[] | undefined;
  tipos: any[] | undefined;
  colores: any[] | undefined;

  //variables seleccionadas
  selectedProveedor: any = 0;
  selectedModelo: any = 0;
  selectedTipo: any = 0;
  selectedColor: any = 0;
  selectedId: number = 0;
  
  selectedImagen: string = "";
  selectedImagen2: string = "";
  
  selectedNombre: string = "";
  selectedDescripcion: string = "";
  selectedPrecio: number = 0;
  selectedPrecioAnterior: number = 0;
  selectedCosto: number = 0;
  selectedAlto: string = "";
  selectedAncho: string = "";
  selectedProfundo: string = "";
  selectedStock: number = 0;
  selectedActivo: number = 0;
  selectedCodigo: number = 0;   
  
  userData: any; //datos del cliente
  id_cliente: number = 1;
  modelosFilter: any;
  tiposFilter: any;
  coloresFilter: any;


  constructor(private post: PostService, private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getProductos();
    this.getProveedor();
    this.getTipo();
    this.userData = this.loginService.decryptData();
  }

  getProductos(){
    let body = {
      "accion" : "get",
      "tabla":"productos",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)}]
    };
    this.post.post("tablas", body).then( data => {
      if(data.cod === 0){
        this.items = data.datos;
        this.collectionSize = this.items.length;
      }
    });
  }

  getProveedor(){
    let body = {
      "accion" : "get",
      "tabla":"proveedor",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)}]
    };
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.proveedores = data.datos;
        this.selectedProveedor = data.datos[0];
        this.getModelo();
        this.getColor();
      }
    });
  }

  getModelo(){
    if(this.selectedProveedor && this.selectedProveedor.id){
      let body = {
        "accion" : "get",
        "tabla":"modelo",     
        "select":["*"],
        "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)}]
      };
      this.post.post("tablas", body).then( (data:any) => {
        console.log(data);
        if(data.cod === 0){
          this.modelos = data.datos;
          this.selectedModelo = data.datos[0];
        }
      });
    }
  }

  getTipo(){
    let body = {
      "accion" : "get",
      "tabla":"tipo",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)}]
    };
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.tipos = data.datos;
        this.selectedTipo = data.datos[0];
      }
    });
  }

  getColor(){
    let body = {
      "accion" : "get",
      "tabla":"color",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)}]
    };
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.colores = data.datos;
        this.selectedColor = data.datos[0];
      }
    });
  }

  openModal(modal: NgbModal, data?: any){
    this.addFilters()
      if(data){
        this.selectedId                      = data.id;
        this.selectedProveedor               = data.proveedor;
        this.selectedModelo                  = data.modelo;
        this.selectedTipo                    = data.tipo;
        this.selectedNombre                  = data.nombre;
        this.selectedImagen                  = data.imagen;
        this.selectedImagen2                 = data.imagen2;
        this.selectedDescripcion             = data.descripcion;
        this.selectedPrecio                  = data.precio;
        this.selectedPrecioAnterior          = data.precio_anterior;
        this.selectedCosto                   = data.costo;
        this.selectedAlto                    = data.alto;
        this.selectedAncho                   = data.ancho;
        this.selectedProfundo                = data.profundo;
        this.selectedColor                   = data.color;
        this.selectedStock                   = data.stock;
      }
      this.modalService.open(modal);
  }

  addArticulo(){
    const body =  {
      "accion" : "insert",
      "tabla": "productos",
      "insert":[ 
              {"campo":"id_cliente","tipo":"n","valor":      String(this.id_cliente)},
              {"campo":"id_proveedor","tipo":"n","valor":    (this.selectedProveedor && this.selectedProveedor.id) ? this.selectedProveedor.id : "0"},
              {"campo":"id_modelo","tipo":"n","valor":       (this.selectedModelo && this.selectedModelo.id) ? this.selectedModelo.id : "0"},
              {"campo":"id_tipo","tipo":"n","valor":         (this.selectedTipo && this.selectedTipo.id) ? this.selectedTipo.id : "0"},
              {"campo":"nombre","tipo":"s","valor":          this.selectedNombre },
              {"campo":"imagen","tipo":"s","valor":          this.selectedImagen         ? this.selectedImagen : ""},
              {"campo":"imagen2","tipo":"s","valor":         this.selectedImagen2        ? this.selectedImagen2 : ""},
              {"campo":"descripcion","tipo":"s","valor":     this.selectedDescripcion    ? this.selectedDescripcion : ""},
              {"campo":"precio","tipo":"n","valor":          this.selectedPrecio         ? String(this.selectedPrecio) : "0"},
              {"campo":"precio_anterior","tipo":"n","valor": this.selectedPrecioAnterior ? String(this.selectedPrecioAnterior) : "0"},
              {"campo":"costo","tipo":"n","valor":           this.selectedCosto          ? String(this.selectedCosto) : "0"},
              {"campo":"alto","tipo":"s","valor":            this.selectedAlto           ? String(this.selectedAlto) : ""},
              {"campo":"ancho","tipo":"s","valor":           this.selectedAncho          ? String(this.selectedAncho) : ""},
              {"campo":"profundo","tipo":"s","valor":        this.selectedProfundo       ? String(this.selectedProfundo) : ""},
              {"campo":"id_color","tipo":"s","valor":        (this.selectedColor && this.selectedColor.id) ? this.selectedColor.id : ""},
              {"campo":"stock","tipo":"n","valor":           this.selectedStock          ? String(this.selectedStock) : "0"},
              {"campo":"codigo","tipo":"s","valor":          this.selectedCodigo         ? String(this.selectedCodigo) : ""}
      ]
    }
    console.log(body);
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items.push({
          id_cliente :      this.id_cliente,
          id_proveedor :    this.selectedProveedor.id  ? this.selectedProveedor.id : "0",
          id_modelo :       this.selectedModelo.id     ? this.selectedModelo.id : "0",
          id_tipo :         this.selectedTipo.id ? this.selectedTipo.id : "0",
          nombre :          this.selectedNombre,
          imagen :          this.selectedImagen ? this.selectedImagen : "",
          imagen2 :         this.selectedImagen2 ? this.selectedImagen2 : "",
          descripcion :     this.selectedDescripcion ? this.selectedDescripcion : "",
          precio :          this.selectedPrecio ? String(this.selectedPrecio) : "0",
          precio_anterior : this.selectedPrecioAnterior ? String(this.selectedPrecioAnterior) : "0",
          costo :           this.selectedCosto ? String(this.selectedCosto) : "0",
          alto :            this.selectedAlto ? String(this.selectedAlto) : "",
          ancho :           this.selectedAncho ? String(this.selectedAncho) : "",
          profundo :        this.selectedProfundo ? String(this.selectedProfundo) : "",
          id_color :        this.selectedColor.id ? this.selectedColor.id : "",
          stock :           this.selectedStock ? String(this.selectedStock) : "0",
          codigo :           this.selectedCodigo ? String(this.selectedCodigo) : ""
        });
      }
    });
  }

  updateArticulo(){
    const body =  {
      "accion" : "update",
      "tabla": "productos",
      "update":[ 
              {"campo":"id_cliente","tipo":"n","valor":      String(this.id_cliente)},
              {"campo":"id_proveedor","tipo":"n","valor":    this.selectedProveedor      ? String(this.selectedProveedor.id) : "0"},
              {"campo":"id_modelo","tipo":"n","valor":       this.selectedModelo         ? String(this.selectedModelo.id) : "0"},
              {"campo":"id_tipo","tipo":"n","valor":         this.selectedTipo           ? String(this.selectedTipo.id) : "0"},
              {"campo":"nombre","tipo":"s","valor":          this.selectedNombre},
              {"campo":"imagen","tipo":"s","valor":          ""},
              {"campo":"imagen2","tipo":"s","valor":         ""},
              {"campo":"descripcion","tipo":"s","valor":     this.selectedDescripcion    ? this.selectedDescripcion : ""},
              {"campo":"precio","tipo":"n","valor":          this.selectedPrecio         ? String(this.selectedPrecio) : "0"},
              {"campo":"precio_anterior","tipo":"n","valor": this.selectedPrecioAnterior ? String(this.selectedPrecioAnterior) : "0"},
              {"campo":"costo","tipo":"n","valor":           this.selectedCosto          ? String(this.selectedCosto) : "0"},
              {"campo":"alto","tipo":"s","valor":            this.selectedAlto           ? String(this.selectedAlto) : ""},
              {"campo":"ancho","tipo":"s","valor":           this.selectedAncho          ? String(this.selectedAncho) : ""},
              {"campo":"profundo","tipo":"s","valor":        this.selectedProfundo       ? String(this.selectedProfundo) : ""},
              {"campo":"id_color","tipo":"s","valor":        this.selectedColor          ? String(this.selectedColor.id) : "0"},
              {"campo":"stock","tipo":"n","valor":           this.selectedStock          ? String(this.selectedStock) : "0"}
      ],
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(this.selectedId)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const updatedItem = {
          id_cliente :      this.id_cliente,
          id_proveedor :    this.selectedProveedor      ? this.selectedProveedor.id : "0",
          id_modelo :       this.selectedModelo         ? this.selectedModelo.id : "0",
          id_tipo :         this.selectedTipo           ? this.selectedTipo.id : "0",
          nombre :          this.selectedNombre,
          imagen :          this.selectedImagen         ? this.selectedImagen : "",
          imagen2 :         this.selectedImagen2        ? this.selectedImagen2 : "",
          descripcion :     this.selectedDescripcion    ? this.selectedDescripcion : "",
          precio :          this.selectedPrecio         ? String(this.selectedPrecio) : "0",
          precio_anterior : this.selectedPrecioAnterior ? String(this.selectedPrecioAnterior) : "0",
          costo :           this.selectedCosto          ? String(this.selectedCosto) : "0",
          alto :            this.selectedAlto           ? String(this.selectedAlto) : "",
          ancho :           this.selectedAncho          ? String(this.selectedAncho) : "",
          profundo :        this.selectedProfundo       ? String(this.selectedProfundo) : "",
          id_color :        this.selectedColor          ? this.selectedColor.id : "",
          stock :           this.selectedStock          ? String(this.selectedStock) : "0",
          codigo:           this.selectedCodigo         ? String(this.selectedCodigo) : "0"
        };
        const index = this.items.indexOf(this.items.find((item:any) => item.id === this.selectedId));
        this.items[index] = updatedItem;

      }
    });
  }

  deleteArticulo(id: number){
    const body =  {
      "accion" : "delete",
      "tabla": "productos",
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(id)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const index = this.items.indexOf(this.items.find((item:any) => item.id === id));
        this.items.splice(index,1);
      }
    });
  }

  verProveedor = (id:number) => {
    if(this.proveedores != undefined && this.proveedores.length >= 0){
      const index = this.proveedores.indexOf(this.proveedores.find((item:any) => item.id == id));
      if(index >= 0 && this.proveedores[index].nombre){
        return this.proveedores[index].nombre;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  verModelo = (id:number) => {
    if(this.modelos != undefined && this.modelos.length >= 0){
      const index = this.modelos.indexOf(this.modelos.find((item:any) => item.id == id));
      if(index >= 0 && this.modelos[index].nombre){
        return this.modelos[index].nombre;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  verColor = (id:number) => {
    if(this.colores != undefined && this.colores.length >= 0){
      const index = this.colores.indexOf(this.colores.find((item:any) => item.id == id));
      if(index >= 0 && this.colores[index].nombre){
        return this.colores[index].nombre;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }

  verTipo = (id:number) => {
    if(this.tipos != undefined && this.tipos.length >= 0){
      const index = this.tipos.indexOf(this.tipos.find((item:any) => item.id == id));
      if(index >= 0 && this.tipos[index].nombre){
        return this.tipos[index].nombre;
      }else{
        return "";
      }
    }else{
      return "";
    }
  }


  addFilters(){
    if(this.selectedProveedor && this.selectedProveedor.id){
      if(this.modelos){
        console.log(this.modelos);
        this.modelosFilter = [];
        this.modelos.forEach(element => {
          if(element.id_proveedor == this.selectedProveedor.id){
            console.log(element);
            this.modelosFilter.push(element);
          }
        });
        this.selectedModelo = this.modelosFilter ? this.modelosFilter[0] : null;
      }
  
      if(this.colores){
        this.coloresFilter = [];
        this.colores.forEach(element => {
          if(element.id_proveedor == this.selectedProveedor.id){
            console.log(element);
            this.coloresFilter.push(element);
          }
        });
        this.selectedColor = this.coloresFilter ? this.coloresFilter[0] : null;
      }
    }

  }

  



}
