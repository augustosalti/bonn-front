import { Component, OnInit } from '@angular/core';
import { PostService } from '../../servicios/post.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/servicios/login.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit {
  items: any;
  page: number = 1;
  pageSize = 5;
  collectionSize = 0;
  //variables seleccionadas

  userData: any; //datos del cliente
  id_cliente: number = 1;
  selectedId: any;
  selectedNombre : String = "";
  selectedDescripcion: any;


  constructor(private post: PostService, private modalService: NgbModal, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getTipos();
    this.userData = this.loginService.decryptData();
  }

  getTipos(){
    let body = {
      "accion" : "get",
      "tabla":"tipo",     
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
        this.selectedDescripcion = data.descripcion;
        this.selectedNombre = data.nombre;
        this.selectedId = data.id;
      }
      this.modalService.open(modal);
  }

  addTipo(){
    const body =  {
      "accion" : "insert",
      "tabla": "tipo",
      "insert":[ 
              {"campo":"id_cliente","tipo":"n","valor":  String(this.id_cliente)},
              {"campo":"nombre","tipo":"s","valor":      this.selectedNombre   ? this.selectedNombre : ""},
              {"campo":"descripcion","tipo":"s","valor":   this.selectedDescripcion   ? this.selectedDescripcion : ""}
      ]
    }
    console.log(body);
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        this.items.push({
          id_cliente :      this.id_cliente,
          nombre :          this.selectedNombre   ? this.selectedNombre : "",
          descripcion :       this.selectedDescripcion   ? this.selectedDescripcion : ""
        });
      }
    });
  }

  updateTipo(){
    const body =  {
      "accion" : "update",
      "tabla": "tipo",
      "update":[ 
          {"campo":"id_cliente","tipo":"n","valor":  String(this.id_cliente)},
          {"campo":"nombre","tipo":"s","valor":      this.selectedNombre   ? this.selectedNombre : ""},
          {"campo":"descripcion","tipo":"s","valor":   this.selectedDescripcion   ? this.selectedDescripcion : ""}
      ],
      "where" :[{"campo":"id","tipo":"n","condicion":"=","valor":String(this.selectedId)}]
    }
    this.post.post("tablas", body).then( (data:any) => {
      if(data.cod === 0){
        const updatedItem = {
          id_cliente :      this.id_cliente,
          nombre : this.selectedNombre ? this.selectedNombre : "",
          descripcion : this.selectedDescripcion  ? this.selectedDescripcion : ""
        };
        const index = this.items.indexOf(this.items.find((item:any) => item.id === this.selectedId));
        this.items[index] = updatedItem;

      }
    });
  }

  deleteTipo(id: number){
    const body =  {
      "accion" : "delete",
      "tabla": "tipo",
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
