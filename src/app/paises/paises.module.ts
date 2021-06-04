import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelectorPageComponent],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaisesModule { }
// NOTA: cuando se empieza a trabajar en un nuevo modulo tenemos que seguir estos pasos

// 1- crear el modulo ng g m "nombreModulo" --routing
// 2-configurar las rutas en  auth-routig-module que acabas de crear
// 3-cargar de modo peresosa la ruta en el app.router.module principal del proyecto
// 4-canfigurar las rutas en donde las vas a cargar (osea en ts y html)donde estara tu navegacion de rutas y recuerda el path es el que tiene que hacer match con tu ruta 