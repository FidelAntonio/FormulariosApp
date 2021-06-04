import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais, PaisSmall } from '../interfaces/paises.interface';
import { Observable, of , combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {


  private _baseUrl: string = 'http://restcountries.eu/rest/v2';

  // el _ nos sirve para indentificar que es privado
  private _regiones: string[] = ['Africa','Americas','Asia','Europe','Oceania'];



  get regiones():string[]{
    // lo desestructuramos para generar una copia del arreglo original y evitar errores al manipularlo por accidente
    return [... this._regiones];
  }

  constructor(private http: HttpClient){ }



  // creamos un servicio que lea la region y traiga el producto de este endpoint
  getPaisesPorRegion(region: string):Observable<PaisSmall[]> {
    // ?fields=alpha3Code;name con esto indicamos que campos necesitamos traer, de lo contrario llegaria todo la info de esta api
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`
    // le ponemos el tipado 
    return this.http.get<PaisSmall[]>(url)

  }

// obteniendo los paises fronterisas  con las que limita el pais
  getPaisPorCodigo(codigo:string):Observable<Pais | null>{

    // preguntado si no existe el codigo
    if(!codigo){
      // si yo necesito regresar un observable existe una funcion of el cual me permite regresar null es decir que no se encontro nungun pais con ese codigo
      return of(null)
    }

    const url: string= `${this._baseUrl}/alpha/${codigo}`
    return this.http.get<Pais>(url);
    
  }

  getPaisPorCodigoSmall(codigo: string):Observable<PaisSmall>{

    const url: string= `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code;name`
    return this.http.get<PaisSmall>(url);

  }


  getPaisesPorCodigos(borders: string[]):Observable<PaisSmall[]>{
// no vienen los bordes entonces regreso un arreglo vacio y no hay nada que seleccionar
    if(!borders){
      return of([])
    }
    // creando un arreglo donde voy a almacenar todas las peticiones http
    const peticiones: Observable<PaisSmall>[]= [];

    // barrer cada uno de los elemntos que tengamos adentro en codigo

    borders.forEach(codigo =>{

      const peticion = this.getPaisPorCodigoSmall(codigo);
      // almacenamos la peticion en el arreglo de peticiones
      peticiones.push(peticion)
    });

    // disparando todas las peticiones de manera simultanea
    // el cabine regresa un observable que contien un arreglo con todas la peticiones
    return combineLatest(peticiones);

  }
}


// REST Countries también permite enviar los códigos de varios países en una sola petición, aunque siempre es bueno aprender todas las opciones. En mi caso, me funcionó con este código:
// getBorderNames(borders: string[]): Observable<PaisSmall[]> {
//   if (!borders || borders.length===0) {
//     return of([]);
//   }
//   const borderCodes = borders.join(';');

//   return this.http.get<PaisSmall[]>
//       (`${this.baseUrl}/alpha/?codes=${borderCodes}
//       &fields=alpha3Code;name`);
// }
