import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  link: string = "";
  producto: ProductoDescripcion = {};
  constructor(private route: ActivatedRoute, 
              public  productosService:  ProductosService) { }

  ngOnInit(): void {

    this.route.params.subscribe(parametros =>{
        this.link = parametros['id'];
        this.productosService.getProducto(parametros['id'])
          .subscribe((producto: ProductoDescripcion) => {
            console.log(producto);
            this.producto = producto;
          })
    })
  }

}
