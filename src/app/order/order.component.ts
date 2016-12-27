import { Component, OnInit } from '@angular/core';
const BrowserWindow = require('electron').remote.BrowserWindow

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  productos:any = [{
      'nombre':"Producto 1",
      'cantidad':"2",
      "precio":"XXX"
  },
  {
      'nombre':"Producto 2",
      'cantidad':"1",
      "precio":"XXX"
  },
  {
      'nombre':"Producto 3",
      'cantidad':"5",
      "precio":"XXX"
  }];
  constructor() { }

  ngOnInit() {
  }

addProducts(){
    console.log("hola");
    console.log(require.resolve('electron'));
}

}
