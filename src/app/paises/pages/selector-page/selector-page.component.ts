import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  // otra manera de desactivar un input del formulario seria en vez de mandar un string vacio hay que mandar un obj {value :'nancy', disable true}

  miFormulario: FormGroup = this.fb.group({
    region:['',[Validators.required]],
    pais:['',[Validators.required]],
    frontera:['',[Validators.required]]
  });

  // llenar selectores
  // nota cuando queremos traer data de una api se hace en el ngOnInit por que ya esta inicializado
  regiones : string[]    = [];
  paises   : PaisSmall[] = [];
  // fronteras: string[]    = [];
  fronteras: PaisSmall[] = [];

  // UI
  cargando : boolean = false;


  constructor(private fb:FormBuilder,
              private paisesServices: PaisesService
    ) { }

  ngOnInit(): void {

    this.regiones = this.paisesServices.regiones

    // // obteniendo el valor del input region cada vez que cambie
    // this.miFormulario.get('region')?.valueChanges.subscribe(region =>{
    //   console.log(region);

    //   this.paisesServices.getPaisesPorRegion(region).subscribe(paises =>{
    //     console.log(paises);
    //     this.paises = paises;
    //   })
    // })

    // obtimizando el codigo de arriga
    // siwtchMap toma el valor producto de un observable y asu vez lo muta y regresa el valor de otro observable

    this.miFormulario.get('region')?.valueChanges
    // el pipe nos ayuda a transformar el valor que venga de valueChanges entre muchas cosas mas
    .pipe(
      // el _ sirve para indicar que no interesa lo que venga osea la region
      tap( ( _ ) => {
        // cada vez que la region cambia este campo del imput va a cambiar igual
        this.miFormulario.get('pais')?.reset('');
        // vamos a mostrar el cargando cuando estamos llamando la info
        this.cargando = true;
        // otra forma de desabilitar un campo
        // this.miFormulario.get('fronteras')?.disable();
      }),
      // a qui vamos a tener el valor producto de mi primer observable que viene del input del formulario del campo region y esto va a regresar un nuevo observable y le mandamos la region 
      switchMap(region => this.paisesServices.getPaisesPorRegion(region))
    )
        // y esto regresa nuestros paises
    .subscribe(paises => {
        //  console.log(paises);
        this.paises = paises;
        // vamos a quitar el cargando por que ya tenemos la data
        this.cargando = false;
      });
      
      // cuando cambia el pais
      this.miFormulario.get('pais')?.valueChanges
          .pipe(
            tap( () => {
              // purgando el arreglo de las fronteras
              this.fronteras = [];
              this.miFormulario.get('frontera')?.reset('');
              this.cargando = true;
              //Desbloqueando el input 
              // this.miFormulario.get('fronteras')?.enable();
            }),
            switchMap(codigo => this.paisesServices.getPaisPorCodigo(codigo)),
            // validando si no existe fronteras dejamos de cargar
            tap( ( country ) => {
              if( country?.name && country.borders.length === 0 ){ 
                this.cargando = false 
              }
            }),
            // utilizando otro switchMap obtenemos el pais por que es el resultado del observable que esta arriba (switchMap)
            switchMap(pais => this.paisesServices.getPaisesPorCodigos(pais?.borders!))
          )
          // recibimos el pais por que es lo que nos regresa el switchMap
          .subscribe(paises =>{
            // console.log(paises);
            // si no trae paises que regrese un obj vacio por que hay paises que no tiene bordes osea que no tienen fonteras con otros paises asi era antes
            // this.fronteras = pais?.borders || [];
            this.fronteras = paises;
            this.cargando = false;

      })

  }


  guardar(){
    console.log(this.miFormulario.value);
  }

}
