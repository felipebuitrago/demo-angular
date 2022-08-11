import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descripcion';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  cargando = true;
  productos : Producto[] = [];
  productosFiltrados : Producto[] = [];

  constructor(private http : HttpClient ) { 

    this.cargarProductos();
  }
   
  cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get<Producto[]>("https://html-angular-a0d45-default-rtdb.firebaseio.com/products_idx.json")
      .subscribe((resp: Producto[]) => {

        this.productos = resp;
        /*console.log(this.productos);*/
        this.cargando = false;  
        resolve(0);
      });
    } )
  }

  getProducto(id:string) {
    return this.http.get<ProductoDescripcion>(`https://html-angular-a0d45-default-rtdb.firebaseio.com/products/${id}.json`)
  }

  buscarProducto(termino: string) {

    if (this.productos.length == 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      } )
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string) {
    
    this.productosFiltrados = [];
    
    this.productos.forEach((prod) => {
      if(prod.categoria!.indexOf(termino) >= 0 || 
            prod.titulo!.toLowerCase().indexOf(termino) >= 0){
        
              this.productosFiltrados.push(prod);
      }
    })
  }
}
