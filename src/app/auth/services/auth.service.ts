import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioAuth } from '../interfaces/auth.interfaces';
import { tap } from 'rxjs/operators';

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

  login() {
    return this.http.get<UsuarioAuth>( `${ this.baseUrl }/usuarios/1` )
          .pipe(
            tap(usuarioAuth => this._usuarioLogeado = usuarioAuth)
          );
  }
}
