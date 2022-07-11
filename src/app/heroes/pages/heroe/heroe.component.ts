import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Heroe } from '../../interfaces/heroes.interfaces';
import { switchMap } from 'rxjs/operators'
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
      img{
        with: 100%;
        border-radius: 5px;

      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //utilizo el switchMap para coger el id de la URl 
        //y llamar el servicio y devolverlo el Heroe como un Observable
        switchMap( ({id}) => this.heroeService.getHeroePorId(id))
      )
      //.subscribe(({ id }) => console.log(id));
      //me subscribo al evento del switchMap y capturo el heroe del service
      .subscribe(heroe => {
        this.heroe = heroe;
        console.log(heroe)
      });
  }

  regresar(){
    this.router.navigate(['/heroes/listado'])
  }

}
