import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fastuser',
  templateUrl: './fastuser.component.html',
  styleUrls: ['./fastuser.component.css']
})
export class FastuserComponent implements OnInit {
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

}
