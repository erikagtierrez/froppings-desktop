import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredientes = ["Ingrediente 1","Ingrediente 2","Ingrediente 3","Ingrediente 4","Ingrediente 5","Ingrediente 6","Ingrediente 1","Ingrediente 2","Ingrediente 3","Ingrediente 4","Ingrediente 5","Ingrediente 6","Ingrediente 1","Ingrediente 2","Ingrediente 3","Ingrediente 4","Ingrediente 5","Ingrediente 6"];

  constructor() { }

  ngOnInit() {
  }

}
