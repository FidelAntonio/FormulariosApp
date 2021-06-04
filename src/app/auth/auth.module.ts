import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    RegistroComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }



// NOTA: cuando se empieza a trabajar en un nuevo modulo tenemos que seguir estos pasos

// 1- crear el modulo ng g m "nombreModulo" --routing
// 2-configurar las rutas en  auth-routig-module que acabas de crear
// 3-cargar de modo peresosa la ruta en el app.router.module principal del proyecto
// 4-canfigurar las rutas en donde las vas a cargar (osea en ts y html)donde estara tu navegacion de rutas y recuerda el path es el que tiene que hacer match con tu ruta 



// Observaciones al configurar las rutas
// la ruta consta de dos partes el primero lo configuras cuando haces la carga perezosa // path:'selectores',  y la otra la configuras en tu modulo de rutas de componente children:[{path: 'selector', mas esplicito ver en shared ts