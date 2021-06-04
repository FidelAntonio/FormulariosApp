import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit  {

  // inicializando miFormulario es de tipo FormGroup
  // y mi primer control que hace match con mi formulario se llama nombre

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre': new FormControl('RTX10'),
  //   'precio': new FormControl(0),
  //   'existencias': new FormControl(0),
  // })
// para trabajar con formBuild es necesario inyectar el servicio
  constructor(private fb: FormBuilder) { }
// validadores sincronos son validaciones que se pueden ejecucuar en el tiempo que el usuario esta tocando un tecla simplemente como disparar funciones de js
// validadores asincronos se puede ejecutar a destiempo es decir verificar un username ir la bd y despues traer la informacion y mostrar el error
  miFormulario:FormGroup = this.fb.group({
    nombre     : [,[Validators.required, Validators.minLength(3)]],
    precio     : [,[Validators.required,Validators.min(0)]],
    existencias: [,[Validators.required,Validators.min(0)]],
  })

  ngOnInit(){
    // establecer un valor al formulario, este obj tiene que ser los mismo que de mi formulario
    this.miFormulario.reset({
      nombre:'RTX1040ti',
      precio: 1500,
      existencias:10
    })
  }


  // validando nuestros campos 
  // el campo que me estas mandando como argumento es el campo que vamos a validar
  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].touched &&
           this.miFormulario.controls[campo].invalid
  }

  guardar(){
    console.log(this.miFormulario.value);

    if(this.miFormulario.invalid){
      // al precionar el btn de guardar y la funcion de  markAllAsTouched automaticamente es como si el usuario hubiese tocado los inputs del formulario y mandamos los erroes
      this.miFormulario.markAllAsTouched();
      return;
    }
    // recetenado el formulario
    this.miFormulario.reset();
    
  }
}
