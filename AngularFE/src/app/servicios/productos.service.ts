import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface IProducto {
  item : string,
  stock : any,
  foto: string,
  precio: any
}

export interface IProductos {
  data : string[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  DatosProductoPost : IProducto = {
    item : '',
    stock : '',
    foto: '',
    precio: ''
  };


  constructor( private http: HttpClient) { }

  private baseUrl : string = environment.production? '' : 'http://localhost:8082';

  getProductos() {
    return this.http.get<IProductos>(this.baseUrl + '/prod');
  }

  postProducto(data : IProducto) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.post<IProducto>(this.baseUrl + '/prod', data, httpOptions );
  }

  deleteProducto(i) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.delete<IProducto>(this.baseUrl + '/prod/' + i, httpOptions );
  }

  actualizarProducto(i, data : IProducto) {
    const httpOptions = {
      headers : new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this.http.put<IProducto>(this.baseUrl + '/prod/' + i, data, httpOptions );
  }

}
