import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos = ["Producto 1","Producto 2","Producto 3","Producto 4","Producto 5","Producto 6","Producto 1","Producto 2","Producto 3","Producto 4","Producto 5","Producto 6","Producto 1","Producto 2","Producto 3","Producto 4","Producto 5","Producto 6"];

  constructor() { }

  ngOnInit() {
  }

}
