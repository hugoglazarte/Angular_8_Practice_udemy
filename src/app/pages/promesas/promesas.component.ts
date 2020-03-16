import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTresSegundos().then(
      () => console.log('Termino')
    )
    .catch(error => {
      console.error('Error en la promesa', error)});
   }

  ngOnInit() {
  }

  contarTresSegundos(){
    return new Promise( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        if(contador === 3){
          resolve();
          // resolve('Ok!');
          clearInterval(intervalo); // ejecuta y termina el intervalo
        }
      }, 1000);

    });

  }

}
