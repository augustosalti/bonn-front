import { Component, OnInit } from '@angular/core';
import { PostService } from '../../servicios/post.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  items: any;
  page: number = 1;
  pageSize = 5;
  collectionSize = 0;


  //variables seleccionadas

  userData: any; //datos del cliente
  id_cliente: number = 1;
  selectedId: any;
  selectedNombre : String = "";
  selectedDescripcion : String = "";
  selectedProveedor: any;
  indexProveedor: number = 0;
  proveedores: any;


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
          this.getModelo(this.selectedProveedor);
        }
      }
    });
  }

  getModelo(proveedor: any){
    
    let body = {
      "accion" : "get",
      "tabla":"modelo",     
      "select":["*"],
      "where" :[{"campo":"id_cliente","tipo":"n","condicion":"=","valor":String(this.id_cliente)},
                {"campo":"id_proveedor","tipo":"n","condicion":"=","valor":String(proveedor.id)}]
    };
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items = data.datos;
      }
    });
  }


  openModal(modal: NgbModal, data?: any){
      if(data){
        this.selectedId = data.id ? data.id : 0;
        this.selectedNombre = data.nombre;
        this.selectedDescripcion = data.descripcion;
        this.selectedId = data.id;
      }
      this.modalService.open(modal);
  }

  addModelo(){
    const body =  {
      "accion" : "insert",
      "tabla": "modelo",
      "insert":[ 
              {"campo":"id_cliente","tipo":"n","valor":     String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":         this.selectedNombre   ? this.selectedNombre : ""},
              {"campo":"descripcion","tipo":"s","valor":    this.selectedDescripcion   ? this.selectedDescripcion : ""},
              {"campo":"id_proveedor","tipo":"n","valor":   this.selectedProveedor   ? this.selectedProveedor.id : "0"},
              {"campo":"id_tipo","tipo":"n","valor":        "0"}
      ]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items.push({
          id_cliente :         this.id_cliente,
          nombre :             this.selectedNombre   ? this.selectedNombre : "",
          descripcion :        this.selectedDescripcion   ? this.selectedDescripcion : "",
          id_proveedor :       this.selectedProveedor   ? this.selectedProveedor.id : "0",
        });
      }
    });
  }

  updateModelo(){
    const body =  {
      "accion" : "update",
      "tabla": "modelo",
      "update":[ 
              {"campo":"id_cliente","tipo":"n","valor":     String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":         this.selectedNombre   ? this.selectedNombre : ""},
              {"campo":"descripcion","tipo":"s","valor":    this.selectedDescripcion   ? this.selectedDescripcion : ""},
              {"campo":"id_proveedor","tipo":"n","valor":   this.selectedProveedor   ? this.selectedProveedor.id : "0"},
              {"campo":"id_tipo","tipo":"n","valor":        "0"}
      ],
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(this.selectedId)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const updatedItem = {
          id_cliente :         this.id_cliente,
          nombre :             this.selectedNombre   ? this.selectedNombre : "",
          descripcion :        this.selectedDescripcion   ? this.selectedDescripcion : "",
          id_proveedor :       this.selectedProveedor   ? this.selectedProveedor.id : "0",
        };
        const index = this.items.indexOf(this.items.find((item:any) => item.id === this.selectedId));
        this.items[index] = updatedItem;

      }
    });
  }

  deleteModelo(id: number){
    const body =  {
      "accion" : "delete",
      "tabla": "modelo",
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
