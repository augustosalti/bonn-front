import { Component, OnInit } from '@angular/core';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  usuario: String = '';
  password: String = '';


  constructor( private login : LoginService) { 
  }

  ngOnInit(): void {
  }

  auth(){
    let body = {
      "usuario" : "bonnlive",
      "contraseña" : "221294"
    };
    this.login.login(body);
  }

}
