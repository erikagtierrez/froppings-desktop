import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css']
})
export class RecipedetailsComponent implements OnInit {
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
