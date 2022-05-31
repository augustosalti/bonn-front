import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../servicios/login.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: String | undefined;
  password: String | undefined;
  encryptSecretKey: String = "4612864836138341"


  constructor(private loginService: LoginService, private router: Router) {
    if(localStorage.getItem('data')){
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
  }

  putLogin(){
    const body = {
      "usuario" : this.usuario,
      "password" : this.password
    }
    this.loginService.login(body).subscribe(data => {
      if(data.cod === 0){
        let storage: any = this.encryptData(body);
        localStorage.setItem('data', storage);
        console.log("Acceso OK");
        this.router.navigate(['/dashboard']);
      }else{
        console.log("Usuario o contraseña incorrectos");
      }
    });

  }


  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey.toString());
    } catch (e) {
      console.log(e);
    }
  }

}
