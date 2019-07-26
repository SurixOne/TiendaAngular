import { Component, OnInit } from '@angular/core';
import { ProductosService, IProductos, IProducto } from '../../servicios/productos.service';
import { SesionService, ISesion } from '../../servicios/sesion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  datosSesionPost : ISesion;
  listaProductos : string[] = [];
  datosProductosPost : IProducto;
  carrito : any[] = [];
  precioTotal : number = 0;

  constructor(private productosService : ProductosService, private sesionService : SesionService) {
    this.datosProductosPost = productosService.DatosProductoPost;
    this.datosSesionPost = sesionService.DatosSesionPost;
    console.log(this.datosSesionPost.logueado);
  }


  ngOnInit() {
    this.obtenerProductos();
  }

  //GET
  obtenerProductos() {
    this.productosService.getProductos()
    .subscribe( (productos: IProductos) => {
      console.log('obtenerProductos: ', productos.data);
      this.listaProductos = productos.data;
    })
  }

  veriDatosProductoPost() {
    if(this.datosProductosPost.item != '' && this.datosProductosPost.stock != '' && this.datosProductosPost.foto != '' && this.datosProductosPost.precio != '')
      return true;
    else 
      return false;
  }

  borrarDatosProductoPost() {
    this.datosProductosPost.item = '';
    this.datosProductosPost.stock = '';
    this.datosProductosPost.foto = '';
    this.datosProductosPost.precio = '';
  }


  //POST
  guardarProducto() {
    console.log('miPrueba', this.datosProductosPost);
    if(this.veriDatosProductoPost()) {
      this.productosService.postProducto(this.datosProductosPost)
      .subscribe( (producto: IProducto) => {
        console.log('guardarProducto: ', producto);
        this.borrarDatosProductoPost();
        this.obtenerProductos();
      })
    }
  }

  //DELETE
  borrarProducto(i) {
    this.productosService.deleteProducto(i)
    .subscribe( (producto: IProducto) => {
      console.log('borrarProducto: ', producto);
      this.obtenerProductos();
    })
  }

  //PUT
  actualizarProducto(i) {
    if(this.veriDatosProductoPost()) {
      this.productosService.actualizarProducto(i, this.datosProductosPost)
      .subscribe( (producto: IProducto) => {
        console.log('actualizarProducto: ', producto);
        this.borrarDatosProductoPost();
        this.obtenerProductos();
      })
    }
  }

  //AgregarACarrito
  comprarProducto(i){
    this.carrito.push(i);
    this.datosSesionPost.carrito = this.carrito;
    console.log(JSON.stringify(this.datosSesionPost.carrito));
    this.precioTotal = 0;
    this.carrito.forEach(item =>{
    this.precioTotal += item.precio;
    })
    alert('el item ' + i.item + ' de stock ' + i.stock + ' ha sido comprado. Precio total acumulado: ' + this.precioTotal);
  }
}
