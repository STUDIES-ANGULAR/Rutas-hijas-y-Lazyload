import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  heroe: Heroe = {
    superhero:        '',
    publisher:     Publisher.DCComics,
    alter_ego:           '',
    first_appearance:       '',
    characters:             '',
    alt_img:          '',
  }
  constructor( private heroesService:  HeroesService,
               private activatedRoute: ActivatedRoute, 
               private router:         Router) { }

  ngOnInit(): void {

    //capturamos el id solo cuando estamos en editar y no en agregar
    if( this.router.url.includes('editar') ){
      this.activatedRoute.params
      .pipe(
        //capturamos el id de la url y buscamos el heroe por ese id para subscribirnos a el
        switchMap(({id}) => this.heroesService.getHeroePorId( id ))
        )
        .subscribe( heroe => this.heroe = heroe)
    }
  }

  guardar(){
      if(this.heroe.superhero.trim().length === 0){
        return;
      }
      
      if(this.heroe.id){
        this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(console.log);
      }else{
        this.heroesService.agregarHeroe(this.heroe)
          .subscribe(heroe => {
            this.router.navigate(['/heroes/editar', heroe.id]);
          })
      }
  }

}
