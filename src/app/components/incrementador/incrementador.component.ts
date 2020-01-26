import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgressRef: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  ngOnInit() {
  }

  onChanges( newValue: number ){

    // Validacion JS Vanilla 1.0
    // validaciones del campo de entrada, para valor mayores a 100
    //  traemos el elemento
    // let elemHTML: any = document.getElementsByName('progreso')[0];
    
    console.log( newValue );

    if( newValue >= 100 )
    {
      this.progreso = 100;
    }
    else if( newValue <= 0 )
    {
      this.progreso = 0;
    }
    else
    {
      this.progreso = newValue;
    }

    // asigno al campo de entrada el valor a mostrar
    // Version JS Vanilla 1.0
    // elemHTML.value = this.progreso;

    // Version ViewChild 1.0
    this.txtProgressRef.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);

    // Enfocando el elemento por ViewChild
    this.txtProgressRef.nativeElement.focus();

  }

  cambiarValor( valor: number ) {

    if(this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      return;
    }
    
    this.progreso = this.progreso + valor;

    // con esto indico que valor estamos mandando por el output, en este caso el valor del progreso
    this.cambioValor.emit(this.progreso);
  
  }

}
