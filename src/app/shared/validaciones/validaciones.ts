 // validacion lpersonalizada
  // son dos validaciones el primero es el nombre seguido de un espacio y el apellido
  // el mas significa cualquier cantidad de caracteres adiciconales

import { FormControl } from "@angular/forms";

  // hasta el espacio es una condicion
  export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


// se cambia a funcion de flecha
  // para mandar llamar esta funcion se hace en las validaciones sincronas 
  export const noPuedeSerStrider = (control:FormControl)=>{
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