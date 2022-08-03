import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UsuarioAuth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _usuarioLogeado: UsuarioAuth | undefined;


  get usuarioLogeado(): UsuarioAuth{
    return {... this._usuarioLogeado!};
  }

  constructor( private http: HttpClient ) { }


  verificaAutenticacion(): Observable<boolean> {
    
    if( !localStorage.getItem('token') ){
      return of(false);
    }

    return this.http.get<UsuarioAuth>( `${ this.baseUrl }/usuarios/1` )
              .pipe(
                map(auth =>{
                  this._usuarioLogeado = auth;
                  return true;
                })
    );
    
  }

  
  login() {
    return this.http.get<UsuarioAuth>( `${ this.baseUrl }/usuarios/1` )
          .pipe(
            tap(usuarioAuth => {
              this._usuarioLogeado = usuarioAuth;
              localStorage.setItem('token', usuarioAuth.id);
            })
          );
  }

  logout() {
    this._usuarioLogeado = undefined;
  }
  
}
