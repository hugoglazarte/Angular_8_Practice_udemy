import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 


    // obs.subscribe(numero => {
    //   console.log('Subs', numero);
    // });

    // RETRY
    // this.regresaObservable().pipe(
    //   retry() //reintenta lanzar el observable cuando salga por error
    //   // retry(2) podemos indicar los intentos
    // )

    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('Subs', numero), // callback obs.next
      error => console.error('Error en el obs', error), // callback obs.error
      () => console.log('El observador termino') //// callback obs.complete
    );

  }

  ngOnInit() {
  }

  // cuando cierro la pagina se dispara
  ngOnDestroy(){
    console.log('la pagina se va a cerrar');
    // corta el subscriptor cuando salimos
    this.subscription.unsubscribe;
  }


  // funcion que retorna un observable, le indicamos el tipo de dato de retorno del observable

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        // EJEMPLO 1:

        // dato de salida
        contador++;
        // notifica la informacion, Resolve de una promesa
        // observer.next( contador ); 


        // EJEMPLO 2:

        // modificamos dato de salida
        const salida = {
          valor: contador
        };

        //notificamos la salida
        observer.next( salida ); 

        if(contador === 3){
          // // termina el intervalo
          clearInterval(intervalo);
          // termina el observable
          // observer.complete();
        }
        // if(contador === 2){
        //   // termina el intervalo
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);

    }).pipe(
      // modificamos la informacion de salida con Map, seguimos enviando un number en lugar de un objeto
      // map( respuesta => {
      //   return respuesta.valor;
      // })

      map(resp => resp.valor),

      // filtramos los resultado, elegimos en que casos informar
      filter((valor, index) => {
        // console.log('Filter', valor, index);

        // filtro por valores pares e impares
        if( (valor % 2) === 1 ){
          //impar 
          return true;

        } else {
          // par
          return false;
        }
      })
    );

  }

}
