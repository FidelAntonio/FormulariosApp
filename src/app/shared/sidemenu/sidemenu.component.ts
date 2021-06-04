import { Component} from '@angular/core';


interface MenuItem{

  texto: string,
  ruta : string,
}
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [
    `
    ul{
      cursor:pointer;
    }
    `
  ]
})


export class SidemenuComponent{

  templateMenu: MenuItem[] = [

    // estas rutas hacen match con las que definimos app-routing.module
    {
      texto:'Básicos',
      ruta:'./template/basicos'
    },
    {
      texto:'Dinámicos',
      ruta:'./template/dinamicos'
    },
    {
      texto:'Switches',
      ruta:'./template/switches'
    }
  ];

  reactiveMenu: MenuItem[] = [

    // estas rutas hacen match con las que definimos app-routing.module
    {
      texto:'Básicos',
      ruta:'./reactive/basicos'
    },
    {
      texto:'Dinámicos',
      ruta:'./reactive/dinamicos'
    },
    {
      texto:'Switches',
      ruta:'./reactive/switches'
    }
  ];

  authMenu: MenuItem[]= [

    {
      texto:'Registro',
      ruta: './auth/registro'
    },
    {
      texto:'Login',
      ruta:'./auth/login'
    },
    
  ]

  // la ruta consta de dos partes el primero lo configuras cuando haces la carga perezosa // path:'selectores',  y la otra la configuras en tu modulo de rutas de componente children:[{path: 'selector',
  
  selectAnidados: MenuItem[] = [
    {
      texto:'Selector',
      ruta:'./selectores/selector'
    }
  ]

}
