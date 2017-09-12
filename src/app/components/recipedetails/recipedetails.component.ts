import {
  Router,
  RouterModule,
  ActivatedRoute,
  ParamMap
} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import { OrderProduct } from "../productspopup/orderProduct";
import * as firebase from "firebase/app";
import swal from "sweetalert2";
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";

@Component({
  selector: "app-recipedetails",
  templateUrl: "./recipedetails.component.html",
  styleUrls: ["./recipedetails.component.css"]
})
export class RecipedetailsComponent implements OnInit {
  product: any;
  ingredientsQuery: any;
  ingredientsList: any[];
  ingredients: any[];
  recipe: FirebaseListObservable<any[]>;
  id: any;
  @Input() name: string;
  @Input() category: string;
  @Input() description: string;
  @Input() price: number;
  @Input() points: number;

  @Input() quantity: number;
  selectedIngredient: string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("ID" + this.id);
    this.product = this.database.list("/products");
    console.log("PRO"+this.product);
    this.recipe = this.database.list("/recipe/" + this.id);
    this.getAvailableIngredients();
  }

  getAvailableIngredients() {
    this.ingredients = [];
    this.ingredientsList = [];
    this.recipe.subscribe(snapshots => {
      snapshots.forEach(snapshots => {
        this.ingredientsList.push(snapshots.name);
      });
    });
    this.ingredientsQuery = this.database
      .list("/ingredients")
      .subscribe(snapshots => {
        snapshots.forEach(snapshots => {
          if (this.ingredientsList.indexOf(snapshots.name) == -1) {
            this.ingredients.push(snapshots.name);
          }
        });
      });
  }

  addIngredient(ingredient) {
    this.recipe.push({
      name: ingredient,
      quantity: this.quantity
    });
    this.getAvailableIngredients();
    this.quantity = null;
  }

  modifyIngredientElement(ingredient, key) {
    var thix = this;
    swal({
      title: "Agrega la cantidad:",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar",
      input: "text",
      inputValidator: function(value) {
        return new Promise(function(resolve, reject) {
          if (value) {
            resolve();
          } else {
            reject("You need to write something!");
          }
        });
      }
    }).then(
      function(cant) {
        thix.recipe.update(key, {
          name: ingredient.name,
          quantity: cant
        });
        console.log("Modified");
      },
      function(dismiss) {
        if (dismiss === "cancel") {
          console.log("Upss! Not modified");
        }
      }
    );
  }

  deleteIngredientElement(product, key) {
    this.recipe.remove(key);
    this.getAvailableIngredients();
  }

  saveRecipe(product, key) {
    this.recipe.update(key, {
      code: product.code,
      description: this.description,
      image: product.image,
      name: this.name,
      points: this.points,
      price: this.price,
      type: this.category
    });
    this.router.navigateByUrl("/products");
  }
}
