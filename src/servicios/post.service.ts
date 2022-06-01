import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


export interface respPost {
  cod?: number;
  datos?: any[] ;
  msj?: string;
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  ruta = `${environment.api}/${environment.version}/api`;

  constructor(protected loginService: AuthService,
    protected  http: HttpClient) { }

  obtenToken() {//

    const bodyToken = {
    usuario : "bonnlive", // nif,  => aqui va el nif
    password : "221294" // pass  => aqui va el password
    };
  
    const apiToken= this.ruta +'/login';
  
    return this.http.post<any>(apiToken, bodyToken ).pipe(take(1));
  };
  
  
  post(endpoint: String, body: any) {
  
    return new Promise<respPost>((resolve, reject) => {
  
        let cod = 0;
        let datos: any = [];
        let msj= 'sin datos';
        const urlaux = `${this.ruta}/${endpoint}`;
  
        this.obtenToken().toPromise().then(
          async (result: any) => {
              const authorization = result.token;
              const headers = {Authorization: authorization, 'Content-Type':  'application/json'};
              this.http.post<any>(urlaux, body , { headers }).pipe(take(1)).subscribe(
                (datosRead: any) => {
                                datos = datosRead;
                                if (datosRead.hasOwnProperty('error')) {
                                  if (datosRead.error.hasOwnProperty('message')) {
                                    cod = 1;
                                    datos = [];
                                    msj = datosRead.error.message;
                                    resolve( {cod,datos,msj});
                                  }
                                 }
  
                                if (datosRead.hasOwnProperty('status')) {
                                  if (datosRead.status==='error') {
                                      if (datosRead.hasOwnProperty('message')) {
                                        cod = 1;
                                        datos = [];
                                        msj = datosRead.message;
                                        reject( {cod,datos,msj});
                                        }
                                   }
                                 }
                                 resolve( {cod:datosRead.cod,datos:datosRead.datos,msj:datosRead.msj});
                                },
                    (error)  => {
                            cod = 1;
                            datos = [];
                            msj = error;
                            reject( {cod,datos,msj});
                            }
                          );
          }).catch(
            (error =>{
              cod = 1;
                datos = [];
                msj = error;
                reject( {cod,datos,msj});
            })
          );
    });
  };


}
