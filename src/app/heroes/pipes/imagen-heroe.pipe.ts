import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagenHeroe',
  //  pure: false // dispara el pipe cada vez que angular haga cualquier cambio 
                  //por defecto pure viene en true
})
export class ImagenHeroePipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if(!heroe.id){
      return '/assets/no-image.png';
    } else if( heroe.alt_img){
      return heroe.alt_img;
    }else{
      return heroe.id ? `assets/heroes/${heroe.id}.jpg` : 'assets/no-image.png';
    }
  }

}
