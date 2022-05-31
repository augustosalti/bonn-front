import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  ruta = `${environment.api}/${environment.version}/api/login`;
  constructor(public http: HttpClient) { }

  login(auth: any){
    const headers = {'Content-Type':  'application/json'};
    const body = {
      "usuario" : auth.usuario,
      "password" : auth.password
    }
    this.http.post<any>(this.ruta, body, { headers }).subscribe(data =>  {
      if(data.cod == 0){
        return data.token;
      }
    });
  }

}
