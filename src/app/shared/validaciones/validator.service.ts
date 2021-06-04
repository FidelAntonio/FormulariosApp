import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

// creamos dos propiedades
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  public emailPattern         : string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  



  // para mandar llamar esta funcion se hace en las validaciones sincronas 
  noPuedeSerStrider  (control:FormControl): ValidationErrors | null{
    //console.log(control.value); // imprimira varias veces el valor del campo de acuedo al ciclo de vida de angular
    //tomando el valor del input userName
    const valor = control.value?.trim().toLowerCase();
    // console.log(valor);

    // validando si lo que escriben es igual a strider marca el error cualquier otra cosa lo deja pasar
    if(valor === 'strider'){
      // con que regresemos un objeto esto es considerado como un error
      return {
        noStrider : true
      }
    }
    // cuando regresamos un null es que no hay ningun error
    return null
  }


  campoIguales(password: string, password2: string){


    // para poder ejecutar esta funcion es necesario regresar una funcion
    // el formGroup representa a todo mi formulario
    return (FormGroup : AbstractControl):ValidationErrors | null =>{
      
      // console.log(FormGroup);

      const pass1 = FormGroup.get(password)?.value;
      const pass2 = FormGroup.get(password2)?.value;


      // viendo los valores que escriben en los campos del input
      // console.log(pass1,pass2);
      
      // recuerda que cuando hay un error retornamos un obj
      if(pass1 !== pass2){
        // estableciendo el error a mi segundo input de las contraseñas
        FormGroup.get(password2)?.setErrors({noIguales : true});
        return {
          noIguales: true
        }
      }
      // esto va a quitar todas las validaciones cuidado

      FormGroup.get(password2)?.setErrors(null);

      // cuando no hay error regresamos null
      return null

    }
  }

  constructor() { }
}
