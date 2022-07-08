import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html'
})
export class HeroeTarjetaComponent {

  // con el ! le decimos que confie que ese heroe tendra valor, pues se le pasa cuando se llama el componente
  @Input() heroe!: Heroe;
 
}
