import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
ingredientes:any = [{
      'nombre':"Ingrediente 1",
      'cantidad':"200gr"
  },
  {
      'nombre':"Ingrediente 2",
      'cantidad':"100gr"
  },
  {
      'nombre':"Ingrediente 3",
      'cantidad':"50gr"
  }];
  constructor() { }

  ngOnInit() {
  }

}
