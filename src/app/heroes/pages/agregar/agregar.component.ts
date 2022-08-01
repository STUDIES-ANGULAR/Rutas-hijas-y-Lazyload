import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
               private router:         Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

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
        .subscribe( heroe => this.mostrarSnackbar('Registro actualizado'));
      }else{
        this.heroesService.agregarHeroe(this.heroe)
          .subscribe(heroe => {
            this.router.navigate(['/heroes/editar', heroe.id]);
             this.mostrarSnackbar('Registro creado');
          })
      }
  }

  eliminarHeroe(){
   const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe} //evitamos que sea modificado {... object}
    });
    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
            this.heroesService.eliminarHeroe(this.heroe.id!)
              .subscribe(resp => {
                this.router.navigate(['/heroes']);
              });
        }
      }
    )
  }


// INTENTO CON SWITCHMAP
  // eliminarHeroe() { 
  //   const dialog = this.dialog.open(ConfirmarComponent, {
  //     width: '250px',
  //     data: { ...this.heroe } //evitamos que sea modificado {... object}
  //   });

  //   dialog.afterClosed()
  //     .pipe(
  //       // console.log(result)
  //       switchMap(({ result }) => result ? this.heroesService.eliminarHeroe(this.heroe.id!): '')
  //     )
  //     .subscribe(ok => {
  //       if(ok){
  //         this.router.navigate(['/heroes']);
  //       }
  //     })
  // }
    

  // eliminarHeroe() {
  //   const dialog = this.dialog.open(ConfirmarComponent, {
  //     width: '250px',
  //     data: { ...this.heroe } //evitamos que sea modificado {... object}
  //   });

  //   dialog.afterClosed()
  //     .pipe(
  //       // console.log(result)
  //       switchMap(({ result }) => this.heroesService.eliminarHeroe(this.heroe.id!))
  //     )
  //     .subscribe(ok => {
  //       if(ok){
  //         this.router.navigate(['/heroes']);
  //       }
  //     })
  // }
    

 mostrarSnackbar ( mensaje: string){

  this.snackBar.open(mensaje, 'ok!', {
    duration: 2500
  })
 }
}
