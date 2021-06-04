import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

// nos sirve para buscar alguna referencia local y le colocamos el nombre de esa propiedad y ! esto significa que siempre va a tener algun valor 
  @ViewChild('miFormulario') miFormulario!: NgForm

  initForm = {
    producto:'RTX',
    precio:10,
    existencia:10
  }

  constructor() { }

  ngOnInit(): void {
  }
  // el signo ? significa que si el producto existe que continue evaluandolo 
  // recuerda que los formularios por template se crean cuando el elemento es renderizado osea en el momento que se a creado todo 

  validarNombre():boolean{
    return this.miFormulario?.controls.producto?.invalid && 
           this.miFormulario?.controls.producto?.touched

  }

  validarPrecio(): boolean{
    return this.miFormulario?.controls.precio?.touched &&
           this.miFormulario?.controls.precio?.value < 0 ;
  }
  existenciaValida(): boolean {
    return this.miFormulario?.controls.existencia?.touched &&
           this.miFormulario?.controls.existencia?.value < 0;
  }

  // guardar(miFormulario: NgForm){
  //   // console.log(miFormulario.value);
  //   console.log(miFormulario);

  // }

  guardar(){
    // console.log(this.miFormulario);

    // if(this.miFormulario.controls.precio.value < 0){
      
    //   console.log('No posteado'); 
    //   return;
    // }

    // para resetear el formulario despues de enviar la informacion
    console.log('formulario enviado');
    // una vez enviado la informacion precargamos la informacion en 0
    this.miFormulario.resetForm({
      precio:0,
      existencia:0
    });
  }

}


// Nota 
// recuerda que el @input es para recivir informacion que viene del componete padre
// y el @output es para emitir algun evento