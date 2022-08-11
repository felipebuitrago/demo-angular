import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public productosService:ProductosService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      this.productosService.buscarProducto(parametros["termino"]);
    })
  }

}
