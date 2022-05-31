import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  ruta = `${environment.api}/${environment.version}/api/login`;
  encryptSecretKey: any = "4612864836138341"

  constructor(public http: HttpClient, private router: Router) { }

  login(auth?: any){
    const headers = {'Content-Type':  'application/json'};
    let body: any;
    if(auth){
      body = {
        "usuario" : auth.usuario,
        "password" : auth.password
      }
    }else{
      let data = this.decryptData();
      body = {
        "usuario" : data.usuario,
        "password" : data.password
      }
    }

    return this.http.post<any>(this.ruta, body, { headers });
  }

  decryptData() {
    const data: any = localStorage.getItem('data');
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }else{
        this.router.navigate(['/login']);
      }
      return data;
    } catch (e) {
      this.router.navigate(['/login']);
      console.log(e);
    }
  }

}