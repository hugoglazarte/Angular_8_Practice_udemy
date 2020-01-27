import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) { 

  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema : string, link : any ){
    console.log(tema);

    this.aplicarCheck(link);
    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck( link: any){

    // traigo todos los elementos de tipo 'selector'
    let selectores: any = document.getElementsByClassName('selector');

    // quito las clases 'working'
    for(let ref of selectores){
      ref.classList.remove('working');
    }

    // agrego el tilde de la clase 'working' al objeto
    link.classList.add('working');

  }

  colocarCheck(){

    let selectores: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for( let ref of selectores ){
      if( ref.getAttribute('data-theme') === tema ){
        ref.classList.add('working');
        break;
      }
    }

  }

}
