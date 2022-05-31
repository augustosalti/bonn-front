import { Component, OnInit } from '@angular/core';
import { PostService } from '../../servicios/post.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  items: any;
  page: number = 1;
  pageSize = 5;
  collectionSize = 0;


  //variables seleccionadas

  userData: any; //datos del cliente
  id_cliente: number = 1;
  selectedId: any;
  selectedTelefono : String = "";
  selectedEmail : String = "";
  selectedDireccion : String = "";
  selectedCP : String = "";
  selectedNombre : String = "";


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
      console.log(data);
      if(data.cod === 0){
        this.items = data.datos;
      }
    });
  }


  openModal(modal: NgbModal, data?: any){
      if(data){
        this.selectedCP = data.cp;
        this.selectedDireccion = data.direccion;
        this.selectedEmail = data.email;
        this.selectedNombre = data.nombre;
        this.selectedTelefono = data.telefono;
        this.selectedId = data.id;
      }
      this.modalService.open(modal);
  }

  addProveedor(){
    const body =  {
      "accion" : "insert",
      "tabla": "proveedor",
      "insert":[ 
              {"campo":"id_cliente","tipo":"n","valor":  String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":      this.selectedNombre   ? this.selectedNombre : ""},
              {"campo":"direccion","tipo":"s","valor":   this.selectedDireccion   ? this.selectedDireccion : ""},
              {"campo":"cp","tipo":"s","valor":          this.selectedCP   ? this.selectedCP : ""},
              {"campo":"telefono","tipo":"s","valor":    this.selectedTelefono   ? this.selectedTelefono : ""},
              {"campo":"email","tipo":"s","valor":       this.selectedEmail   ? this.selectedEmail : ""}
      ]
    }
    console.log(body);
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items.push({
          id_cliente :      this.id_cliente,
          nombre :          this.selectedNombre   ? this.selectedNombre : "",
          direccion :       this.selectedDireccion   ? this.selectedDireccion : "",
          cp :              this.selectedCP   ? this.selectedCP : "",
          telefono :        this.selectedTelefono   ? this.selectedTelefono : "",
          email :           this.selectedEmail   ? this.selectedEmail : ""
        });
      }
    });
  }

  updateProveedor(){
    const body =  {
      "accion" : "update",
      "tabla": "proveedor",
      "update":[ 
          {"campo":"id_cliente","tipo":"n","valor":  String(this.id_cliente)},
          {"campo":"nombre","tipo":"s","valor":      this.selectedNombre   ? this.selectedNombre : ""},
          {"campo":"direccion","tipo":"s","valor":   this.selectedDireccion   ? this.selectedDireccion : ""},
          {"campo":"cp","tipo":"s","valor":          this.selectedCP   ? this.selectedCP : ""},
          {"campo":"telefono","tipo":"s","valor":    this.selectedTelefono   ? this.selectedTelefono : ""},
          {"campo":"email","tipo":"s","valor":       this.selectedEmail   ? this.selectedEmail : ""}
      ],
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(this.selectedId)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const updatedItem = {
          id_cliente :      this.id_cliente,
          nombre : this.selectedNombre ? this.selectedNombre : "",
          direccion : this.selectedDireccion  ? this.selectedDireccion : "",
          cp : this.selectedCP   ? this.selectedCP : "",
          telefono : this.selectedTelefono   ? this.selectedTelefono : "",
          email : this.selectedEmail   ? this.selectedEmail : ""
        };
        const index = this.items.indexOf(this.items.find((item:any) => item.id === this.selectedId));
        this.items[index] = updatedItem;

      }
    });
  }

  deleteTipo(id: number){
    const body =  {
      "accion" : "delete",
      "tabla": "proveedor",
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
