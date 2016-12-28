const {BrowserWindow} = require('electron').remote;
const path = require('path')
import { NewproductComponent } from './../newproduct/newproduct.component';
import { Component, OnInit } from '@angular/core';


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
  
  constructor() {
   }

  ngOnInit() {
  }

    addProducts(){
         const componentPath = path.join('file://', __dirname, '../newproduct/newproductcomponent.html');
        let win = new BrowserWindow({ width: 700, height: 900, 'minHeight': 900, 'minWidth': 700 });
        win.loadURL(componentPath);
    }
}
