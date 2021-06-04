import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ControlContainer, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// nota las validaciones asincronas se utilizan cuando necesitas  hacer una peticion http
// necesitamos implementar la interfaz de AsyncValidator el cual se llama validate

export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log(email)

    // si lo encuentra regresamos un objeto si no existe regresamos un arreglo vacio

    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
               .pipe(

                // delay(3000),
                 map(resp => {
                  //  las respuesta siempre va ser un arreglo, si el arreglo trae algo ese correo ya fue tomado

                  return (resp.length === 0)
                         ? null
                         : {emailTomado: true} // ya existe el email
                 })
               )      
}
}

// hay tres valores del formulario que es valido, invalido o pendiente
