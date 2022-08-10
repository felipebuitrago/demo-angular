import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos : Producto[] = [];

  constructor(private http : HttpClient ) { 

    this.cargarProductos();
  }
   
  cargarProductos() {
    this.http.get<Producto[]>("https://html-angular-a0d45-default-rtdb.firebaseio.com/products_idx.json")
      .subscribe((resp: Producto[]) => {

        this.productos = resp;
        console.log(this.productos);
        setTimeout(() => {
          this.cargando = false;  
        }, 500);
      })
  }
}
