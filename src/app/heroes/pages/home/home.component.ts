import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioAuth } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container{
    margin:10px;
  }`
  ]
})
export class HomeComponent {

 get getUsuarioAuth() {
    return this.authService.usuarioLogeado;
 }

  constructor( private router: Router,
               private authService: AuthService) { }

  logout(){
    this.router.navigate(['auth']);
  };
}
