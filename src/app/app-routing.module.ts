import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule) // importamos el modulo ya que en el se encuentra todo importado
                                                     //con el import se cargua en memoria entonces (.then de promesa resuelta) regresa el modulo AuthModule    
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(module => module.HeroesModule)
  },
  {
    path: '404',
    component : ErrorPageComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent 
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
 