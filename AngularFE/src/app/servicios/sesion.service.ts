import { Injectable } from '@angular/core';

export interface ISesion {
  usuario : string,
  mail : any,
  carrito: any,
  logueado: boolean,
  saldo: number
}
@Injectable({
  providedIn: 'root'
})
export class SesionService {
  DatosSesionPost : ISesion = {
    usuario : '',
    mail : '',
    carrito: '',
    logueado: false,
    saldo: 10000
  };
  logueado : boolean = false;
  
  constructor() { }
  consolaSesion(){
    console.log(this.DatosSesionPost.logueado);
  }
}
