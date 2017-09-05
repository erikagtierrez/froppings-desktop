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
  selector: "app-newproduct",
  templateUrl: "./newproduct.component.html",
  styleUrls: ["./newproduct.component.css"]
})
export class NewproductComponent implements OnInit {
  ingredientsList: any[];
  recipe: FirebaseListObservable<any[]>;
  key: any;
  product: firebase.database.ThenableReference;
  ingredients: any[]=[];
  @Input() quantity: number;
  selectedIngredient: string="";
  @Input() name: string;
  @Input() category: string;
  @Input() description: string;
  @Input() price: number;
  @Input() points: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.key = this.database.list("/products").push({
      image:
        "http://cdn-image.myrecipes.com/sites/default/files/tagalong-milkshake.jpg"
    }).key;
    console.log(this.key);
    this.database
      .list("/ingredients")
      .subscribe(snapshots => {
        snapshots.forEach(snapshots => {
            console.log(snapshots.name);
          this.ingredients.push(snapshots.name);
        });
      });
  }

  getAvailableIngredients() {
    this.ingredients = [];
    this.ingredientsList = [];
    this.recipe.subscribe(snapshots => {
      snapshots.forEach(snapshots => {
        this.ingredientsList.push(snapshots.name);
      });
    });
    this.database.list("/ingredients").subscribe(snapshots => {
      snapshots.forEach(snapshots => {
        if (this.ingredientsList.indexOf(snapshots.name) == -1) {
          this.ingredients.push(snapshots.name);
          console.log("added: " + snapshots.name);
        }
      });
    });
  }

  addIngredient(ingredient) {
    this.recipe = this.database.list("/recipe/" + this.key);
    this.recipe.push({
      name: ingredient,
      quantity: this.quantity
    });
    this.getAvailableIngredients();
    this.quantity = null;
  }

  modifyIngredientElement(ingredient,key){
    var thix=this;
    swal({
      title: 'Agrega la cantidad:',
      showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Ok',
       cancelButtonText:
        'Cancelar',
        input: 'text',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value) {
              resolve()
            } else {
              reject('You need to write something!')
            }
          })
        }
    }).then(function (cant) {    
      thix.recipe.update(key,{
        name: ingredient.name,
        quantity: cant
      })
      console.log("Modified")    
    }, function (dismiss) {
        if (dismiss === 'cancel') {
        console.log("Upss! Not modified")
      }
    }) 
  }

  deleteIngredientElement(product,key){
    this.recipe.remove(key);
    this.getAvailableIngredients();    
  }

  saveProduct(product){
    this.database.list("/products").update(this.key,{
        "code":this.key,
        "description":this.description,
        "image":"http://cdn-image.myrecipes.com/sites/default/files/tagalong-milkshake.jpg",
        "name":this.name,
        "points":this.points,
        "price":this.price,
        "type":this.category
    });
    this.router.navigateByUrl("/products");      
}
}
