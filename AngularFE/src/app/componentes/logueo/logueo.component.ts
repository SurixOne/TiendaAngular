import { Component, OnInit } from '@angular/core';
import { LogueoService, ILogueo } from '../../servicios/logueo.service';
import { SesionService, ISesion } from '../../servicios/sesion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validaciones/espacios.validator';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css']
})
export class LogueoComponent implements OnInit {

  logueado : boolean = false;
  form : FormGroup;
  datosLogueoPost : ILogueo;
  datosSesionPost : ISesion;

  constructor(private fb : FormBuilder, private logueoService : LogueoService, private sesionService : SesionService) {
    this.datosLogueoPost = logueoService.DatosLogueoPost;
    this.datosSesionPost = sesionService.DatosSesionPost;
    this.form = fb.group({
      usuario: ['',Validators.compose([
        Validators.required,
        VerificarEspacios
      ])],
      correo: ['',Validators.compose([
        Validators.required,
        Validators.email,
        VerificarEspacios
      ])],
      clave: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
        VerificarEspacios
      ])]
    })
  }

  ngOnInit() {
  }
  //Este no se ejecuta, POST
  loguearUsuario() {
      console.log('enviar logueo 1', this.datosLogueoPost);
      this.logueoService.postLogueo(this.datosLogueoPost)
      .subscribe( (logueo: ILogueo) => {
        console.log('enviar logueo: ', logueo);
        //Necesito un this.obtenerRegistro(); que me tire la data de mi registro xd
      })
  } //este se ejecuta al loguear, POST
  loguearUsuario1() {
    console.log('enviar logueo 1', this.datosLogueoPost);
    this.logueoService.postLogueo(this.datosLogueoPost)
    .subscribe( (usuario: ILogueo) => {
      console.log('loguear usuario: ', usuario);
      this.datosSesionPost.logueado = true;
      this.datosSesionPost.carrito = usuario.carrito;
      this.datosSesionPost.mail = usuario.mail;
      this.datosSesionPost.usuario = usuario.usuario;
      this.sesionService.consolaSesion();
    })
  }
}
