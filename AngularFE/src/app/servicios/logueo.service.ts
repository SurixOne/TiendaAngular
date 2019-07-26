import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ILogueo {
  usuario : string,
  clave : string
  mail : string,
  carrito : any[]
}

export interface ILogueos {
  data : string[]
}

@Injectable({
  providedIn: 'root'
})
export class LogueoService {

  DatosLogueoPost : ILogueo = {
    usuario : '',
    clave : '',
    mail: '',
    carrito : []
  };


  constructor( private http: HttpClient) { }

  private baseUrl : string = environment.production? '' : 'http://localhost:8082';

  getLogueos() {
    return this.http.get<ILogueos>(this.baseUrl + '/log');
  }

  postLogueo(data : ILogueo) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.post<ILogueo>(this.baseUrl + '/log', data, httpOptions );
  }
  //this.datosProductosPost = productosService.DatosProductoPost;
}
