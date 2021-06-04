import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

// para poder utilizar la directiva tiene que tener el nombre y el ngModel nuestro campo del input, las directivas tienen que ser incluidas en el modulo en la parte de declarations CustomMinDirective 
// el implements validator es un objeto que viene con angular para hacer este tipo de validaciones como required min
// en pocas palabras el providers es como un servicio que necesitamos inyectar y necesitamos expandir
@Directive({
    selector:'[custonMin][ngModel]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting:CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator{


    // recivimos el minimo del componente padre con @input

    @Input() minimo!:number

    constructor(){
        // console.log('Directiva',this.minimo)
    }

    validate(control: FormControl){

        const inputValue = control.value;

        // console.log(inputValue);
        // console.log('minimo', this.minimo)
// preguntamos si el valor de input es menor a cero regresamos un objeto con el error si no hay error lo dejamos pasar
        return (inputValue < this.minimo) 
                ? {'customMin': true}
                : null
    }
}