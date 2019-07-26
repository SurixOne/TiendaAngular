import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SectionComponent } from './componentes/section/section.component';
import { NavComponent } from './componentes/nav/nav.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { LogueadoComponent } from './componentes/logueado/logueado.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { LogueoComponent } from './componentes/logueo/logueo.component';

const routes : Routes = [
  { path: '', redirectTo: 'productos', pathMatch:'full'},
  { path: 'ingreso', component: RegistroComponent },
  { path: 'section', component: SectionComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'logueado', component: LogueadoComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'logueo', component: LogueoComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    NavComponent,
    RegistroComponent,
    ProductosComponent,
    LogueadoComponent,
    CarouselComponent,
    FooterComponent,
    LogueoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: !true}
    ),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
