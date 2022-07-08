import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagenHeroe'
})
export class ImagenHeroePipe implements PipeTransform {

  transform(heroe: Heroe): string {
    return heroe.id ? `assets/heroes/${heroe.id}.jpg` : 'assets/no-image.png';
  }

}
