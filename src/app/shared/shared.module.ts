import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidemenuComponent } from './sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    SidemenuComponent
  ],

  // recuerda que tienes que exportar los componentes creados (sidemenu) en este modulo shared para poder utilizarlos fuera de este modulo, tambien este shared.module.ts se importa en el app.module.ts en la parte de los inports
  exports:[
    SidemenuComponent
  ],
  // para poder utilizar routerLink es necesario importar RouterModule
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
