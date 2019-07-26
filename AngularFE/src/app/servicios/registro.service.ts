import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface IRegistro {
  usuario : string,
  mail : any,
  clave: string,
  carrito: any
}

export interface IRegistros {
  data : string[]
}
export interface ILogueo {
  usuario : string,
  clave : string
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  DatosRegistroPost : IRegistro = {
    usuario : '',
    mail : '',
    clave: '',
    carrito: ''
  };

  DatosLogueoPost : ILogueo = {
    usuario : '',
    clave: ''
  };

  constructor( private http: HttpClient) { }

  private baseUrl : string = environment.production? '' : 'http://localhost:8082';

  getUsuarios() {
    return this.http.get<IRegistros>(this.baseUrl + '/usu');
  }

  postUsuario(data : IRegistro) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.post<IRegistro>(this.baseUrl + '/usu', data, httpOptions );
  }
  postLogueo(data : ILogueo) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.post<ILogueo>(this.baseUrl + '/log', data, httpOptions );
  }
  deleteUsuario(i) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.delete<IRegistro>(this.baseUrl + '/usu/' + i, httpOptions );
  }

  actualizarUsuario(i, data : IRegistro) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.put<IRegistro>(this.baseUrl + '/usu/' + i, data, httpOptions );
  }
  login(body:any){
    return this.http.post('http://localhost:4200/logueado', body, {
      observe: 'body',
      withCredentials: false,
      headers: new HttpHeaders().append('Content-type', 'application.json')
    })
  }
}
