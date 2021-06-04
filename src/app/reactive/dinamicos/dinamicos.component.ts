import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  // creando una nueva propiedad para enlazarlo con mi input de agregar
  // RECUERDA que un control es un input un check un valor nuevo del formulario

  nuevoFavorito: FormControl = this.fb.control('',Validators.required);

  miFormulario:FormGroup = this.fb.group({
    nombre:['', [Validators.required,Validators.minLength(3)]],
    favoritos: this.fb.array([
      //estos son ms formcontrol
      ['Metal Gear',Validators.required],
      ['Death Stranding',Validators.required]
    ],Validators.required)
  });

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }else{
      console.log(this.miFormulario.value)
    }
  }

  agregarFavorto(){
    // si es invalido no hace nada y no continue con la insercion
    if(this.nuevoFavorito.invalid){
      return;
    }
// el primer argumento que le mandamos alcontrol es el valor que capturamos del input despues seguirian las validaciones  se puede hacer de dos formas 
    // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value,Validators.required));
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value,Validators.required));
    //limpiando el input despues de agregarlo
    this.nuevoFavorito.reset();
  }

  borrarFavorito(index: number){ 
    console.log(index);

    this.favoritosArr.removeAt(index)

  }

}
