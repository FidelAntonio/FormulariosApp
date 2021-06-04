import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validaciones/validaciones';
import { ValidatorService } from 'src/app/shared/validaciones/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 


  

  // con Validators.patter() mandamos a llamar nuestra validacion personalizada
  // llamamos a nuestro servicio y dentro a sus metodos
  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.valitadorServices.nombreApellidoPattern)]],
    email: ['',[Validators.required,Validators.pattern(this.valitadorServices.emailPattern)]],
    userName: ['',[Validators.required, this.valitadorServices.noPuedeSerStrider]],
    password:['',[Validators.required, Validators.minLength(6) ]],
    password2:['', [Validators.required]]
    
  },{
    // estableciendo errores al formulario de forma global se escribe con v minuscula
    validators: [ this.valitadorServices.campoIguales('password','password2')]
  }
  );
  constructor(private fb: FormBuilder,
              private valitadorServices: ValidatorService
    ) {

  }
  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched 
  }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre:'israel fidel',
      email:'isra.fide96@gmail.com',
      userName:'Ryosuke'
    })
  }

  validarCampoRequerido(campo: string): boolean {
    return (
      this.miFormulario.controls[campo]?.hasError('required') &&
      this.miFormulario.controls[campo]?.touched
    );
  }

  errorPersonalizado(campo: string) {
    return (
      this.miFormulario.controls[campo]?.hasError('pattern') 
    );
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }else{
      console.log(this.miFormulario.value);
    }
  }
}
