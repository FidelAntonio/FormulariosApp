import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

// definimos el formulario
// para validar booleanos existe Validators.RequiredTrue
// required acepta hasta null por eso el formulario es valido
  miFormulario: FormGroup = this.fb.group({
    genero:['M',[Validators.required]],
    notificaciones:[true,[Validators.required]],
    condiciones:[false,[Validators.requiredTrue]],
  });

  persona={
    genero: 'F',
    notificaciones: true,
  }
  constructor(private fb: FormBuilder) { }
// para establecer informacion en el formulario usualmente se hace el ngOnInit ej, con un servicio etc
  ngOnInit(): void {

    // esto es por si miFormulario y las personas no tienen los mismos controles falla
    this.miFormulario.reset({...this.persona,
      // anadiendo las propiedades y valores adicionales que necesito
      condiciones: true
    
    });

    // tambien nos podemos suscribir a un campo en particular
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(newvalue =>{
    //   console.log(newvalue);
    // })

    // para poder sincronizar el formulario con la persona nos tenemos que suscribir 
    // this.miFormulario.valueChanges.subscribe( form =>{
    //   // extrayendo la informacion del objeto form que no me interesa
    //   delete form.condiciones;

    //   this.persona = form;
    //   console.log(form);
    // });

    // haciendo lo mismo de arriba pero con desestructuracion
    // esto quiere decir que el primer parametro es el que estoy estrayendo 
    // el segundo son los datos que quedan y las guardo en rest
    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest})=>{
      this.persona = rest;
    })


  }
// ACTUALIZANDO EL VALOR DE LA PERSONA
  guardar(){
    const formValue = {...this.miFormulario.value};

    delete formValue.condiciones;

    this.persona = formValue;

    console.log(formValue);
  }

}
