import { Component } from '@angular/core';

// como va a lucir la data
interface Persona{
  nombre: string,
  favoritos: Favorito[]; 

}
interface Favorito{
  id: number,
  nombre:string

}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {


  //objeto inicializador de la data
  persona:Persona = {
    nombre: 'Fidel',
    favoritos:[
      { id:1, nombre:'Metal gear Solid'},
      { id:2, nombre:'Death Stranding'},
    ]
    
  }
  // esta propiedad hace match con mi input del html con  [(ngModel)]="nuevoJuego"
  nuevoJuego: string = ''

  borrar(index: number){
    this.persona.favoritos.splice(index,1)
    console.log(index);
  }

  agregar(){

    const agregarNuevoFavorio: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...agregarNuevoFavorio});
    this.nuevoJuego = '';
  }


  guardar(){
    console.log('formulario posteado')
  }



}
