import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerificarEspacios } from 'src/app/validaciones/espacios.validator';
import { RegistroService, IRegistros, IRegistro } from '../../servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  logueado : boolean = false;

  listaRegistros : string[] = [];
  datosRegistrosPost : IRegistro;

  form : FormGroup;
  titulo : string = 'Registrarme';

  constructor(private fb : FormBuilder, private registroService : RegistroService) {
    
    this.datosRegistrosPost = registroService.DatosRegistroPost;

    this.form = fb.group({
      usuario: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
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
  //console.log(JSON.stringify(this.form.value));
  //POST
  registrarUsuario() {
      this.registroService.postUsuario(this.datosRegistrosPost)
      .subscribe( (registro: IRegistro) => {
        console.log('guardar Registro: ', registro);
        //Necesito un this.obtenerRegistro(); que me tire la data de mi registro xd
      })
  }
}
