import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta) { 

    this.getDataRoute().subscribe( data => {
      console.log(data);
      this.titulo = data.titulo;
      // Seteamos el titulo de la Web
      this.title.setTitle( this.titulo);

      // Añadiendo metatags
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo 
      };

      // Actualizamos los meta tags
      this.meta.updateTag( metaTag );

    });

  }

  ngOnInit() {
  }

  getDataRoute(){

    // RETORNA UN OBSERVABLE
    return this.router.events.pipe(
      // filtro y obtengo el atributo que necesito del router (son dos) 
      filter( evento => evento instanceof ActivationEnd ),
      // traigo el que necesito
      filter( ( evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
      // limpio el resultado y solo traigo el valor requerido
      map( (evento: ActivationEnd ) =>  evento.snapshot.data )
    )

  }

}
