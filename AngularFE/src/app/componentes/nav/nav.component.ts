import { Component, OnInit } from '@angular/core';
import { SesionService, ISesion } from '../../servicios/sesion.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  datosSesionPost : ISesion;
  
  constructor(private sesionService : SesionService) {
    this.datosSesionPost = sesionService.DatosSesionPost;
  }

  ngOnInit() {
  }

}
