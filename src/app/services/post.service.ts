import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  ruta = `${environment.api}/${environment.version}/api/login`;
  constructor(public http: HttpClient) { }

  post(auth: any){


    

    const headers = {'Content-Type':  'application/json'};
    const body = {
      "usuario" : auth.usuario,
      "password" : auth.password
    }

    this.http.post<any>(this.ruta, body, { headers }).subscribe(data =>  {
      if(data.cod == 0){
        console.log(data);
      }
    });
  }

}