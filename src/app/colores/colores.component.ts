import { Component, OnInit } from '@angular/core';
import { PostService } from '../../servicios/post.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-colores',
  templateUrl: './colores.component.html',
  styleUrls: ['./colores.component.css']
})
export class ColoresComponent implements OnInit {

  
  items: any;
  page: number = 1;
  pageSize = 5;
  collectionSize = 0;


  //variables seleccionadas

  userData: any; //datos del cliente
  id_cliente: number = 1;
  selectedId: any;
  selectedNombre : String = "";
  selectedProveedor: any;
  indexProveedor: number = 0;
  proveedores: any;
  tipos: any;
  selectedTipo: any;


  constructor(private post: PostService, private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getProveedor();
    this.userData = this.loginService.decryptData();
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
        if(this.proveedores.length > 0){
          this.selectedProveedor = this.proveedores[0];
          this.getTipo();
        }
      }
    });
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
        if(this.tipos.length > 0){
          this.selectedTipo = this.tipos[0];
          this.getColor();
        }
      }
    });
  }

  getColor(){
    let body = {
      "accion" : "get",
      "tabla":"color",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)},
                {"campo":"id_proveedor","tipo":"n","condicion":"=","valor":String(this.selectedProveedor.id)},
                {"campo":"id_tipo","tipo":"n","condicion":"=","valor":String(this.selectedTipo.id)}]
    };
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items = data.datos;
      }
    });
  }


  openModal(modal: NgbModal, data?: any){
      if(data){
        this.selectedNombre = data.nombre;
        this.selectedId = data.id;
        this.selectedNombre = data.nombre;
      }
      this.modalService.open(modal);
  }

  addColor(){
    const body =  {
      "accion" : "insert",
      "tabla": "color",
      "insert":[ 
              {"campo":"id_cliente","tipo":"n","valor":     String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":         this.selectedNombre      ? this.selectedNombre : ""},
              {"campo":"id_proveedor","tipo":"n","valor":   this.selectedProveedor   ? this.selectedProveedor.id : "0"},
              {"campo":"id_tipo","tipo":"n","valor":        this.selectedTipo        ? this.selectedTipo.id : "0"}
      ]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items.push({
          id_cliente :         this.id_cliente,
          nombre :             this.selectedNombre   ? this.selectedNombre : "",
          id_tipo :            this.selectedTipo   ? this.selectedTipo.id : "",
          id_proveedor :       this.selectedProveedor   ? this.selectedProveedor.id : "0",
        });
      }
    });
  }

  updateColor(){
    const body =  {
      "accion" : "update",
      "tabla": "color",
      "update":[ 
              {"campo":"id_cliente","tipo":"n","valor":     String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":         this.selectedNombre      ? this.selectedNombre : ""},
              {"campo":"id_proveedor","tipo":"n","valor":   this.selectedProveedor   ? this.selectedProveedor.id : "0"},
              {"campo":"id_tipo","tipo":"n","valor":        this.selectedTipo        ? this.selectedTipo.id : "0"}
      ],
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(this.selectedId)}]
    }
    console.log(body);
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const updatedItem = {
          id_cliente :         this.id_cliente,
          nombre :             this.selectedNombre   ? this.selectedNombre : "",
          id_tipo :            this.selectedTipo   ? this.selectedTipo.id : "",
          id_proveedor :       this.selectedProveedor   ? this.selectedProveedor.id : "0",
        };
        const index = this.items.indexOf(this.items.find((item:any) => item.id === this.selectedId));
        this.items[index] = updatedItem;
      }
    });
  }

  deleteColor(id: number){
    const body =  {
      "accion" : "delete",
      "tabla": "color",
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(id)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const index = this.items.indexOf(this.items.find((item:any) => item.id === id));
        this.items.splice(index,1);
      }
    });
  }
  

}
