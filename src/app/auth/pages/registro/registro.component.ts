import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validaciones/validator.service';
import { EmailValidatorService } from '../../../shared/validaciones/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  // con Validators.patter() mandamos a llamar nuestra validacion personalizada
  // llamamos a nuestro servicio y dentro a sus metodos
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.valitadorServices.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.valitadorServices.emailPattern),
        ],
        [this.emailValidator],
      ],
      userName: [
        '',
        [Validators.required, this.valitadorServices.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      // estableciendo errores al formulario de forma global se escribe con v minuscula
      validators: [
        this.valitadorServices.campoIguales('password', 'password2'),
      ],
    }
  );

// este mensaje de error siempre se va a ejecutar cuando angular detecte un cambio en el componente
  get emailErrorMsg(): string{

    const errorsMsg = this.miFormulario.get('email')?.errors;

    if(errorsMsg?.required){
      return 'El correo es obligatorio';
    }else if(errorsMsg?.pattern){
      return 'Ingrese un correo valido';
    } else if(errorsMsg?.emailTomado){
      return 'El correo ya existe';
    }
    return '';
  }


  get nombreErrorMsg():string{
    const errorsMsg = this.miFormulario.get('nombre')?.errors;

    if(errorsMsg?.required){
      return 'El nombre es obligatorio';
    }else if(errorsMsg?.pattern){
      return 'Ingrese su nombre y un apellido';
    } 
    return '';
  }


  get nombreUsuarioErrorMsg():string{
    const errorsMsg = this.miFormulario.get('userName')?.errors;

    if(errorsMsg?.required){
      return 'El nombre de usuario es obligatorio';
    }else if(errorsMsg?.noStrider){
      return 'El usuario ya existe';
    } 
    return '';
  }
  constructor(
    private fb: FormBuilder,
    private valitadorServices: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'israel fidel',
      email: 'test1@test.com',
      userName: 'Ryosuke',
      password: '123456',
      password2: '123456',
    });
  }

  validarCampoRequerido(campo: string): boolean {
    return (
      this.miFormulario.controls[campo]?.hasError('required') &&
      this.miFormulario.controls[campo]?.touched
    );
  }

  // errorPersonalizado(campo: string) {
  //   return this.miFormulario.controls[campo]?.hasError('pattern');
  // }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    } else {
      console.log(this.miFormulario.value);
    }
  }
}
