import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveRoutingModule } from './reactive-routing.module';


import { BasicosComponent } from './basicos/basicos.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { SwitchesComponent } from './switches/switches.component';


// ng g m template --routing para crear un modulo con su ruta ponemos este comando
@NgModule({
  declarations: [
    BasicosComponent, 
    DinamicosComponent, 
    SwitchesComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReactiveModule { }
