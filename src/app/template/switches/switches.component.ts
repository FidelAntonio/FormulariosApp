import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent {

 @ViewChild('miFormulario') miFormulario!: NgForm
 
persona = {
  genero: 'F',
  notificaciones: true
}
terminoYCondiciones: boolean = true;

validarTerminos(): boolean{
return this.miFormulario?.controls.terminos?.invalid && 
this.miFormulario?.controls.terminos?.touched

}

}


