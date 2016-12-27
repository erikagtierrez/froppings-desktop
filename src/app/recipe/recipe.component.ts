import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recetas = ["Receta 1","Receta 2","Receta 3","Receta 4","Receta 5","Receta 6","Receta 1","Receta 2","Receta 3","Receta 4","Receta 5","Receta 6","Receta 1","Receta 2","Receta 3","Receta 4","Receta 5","Receta 6"];

  constructor() { }

  ngOnInit() {
  }

}
