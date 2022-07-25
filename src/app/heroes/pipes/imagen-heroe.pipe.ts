import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagenHeroe'
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
