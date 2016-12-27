import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newrecipe',
  templateUrl: './newrecipe.component.html',
  styleUrls: ['./newrecipe.component.css']
})
export class NewrecipeComponent implements OnInit {
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
