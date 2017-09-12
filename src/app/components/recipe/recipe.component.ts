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
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipes: any;
  product: any;
  key=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.recipes=this.database.list("/recipe");
    this.product=this.database.list("/products");
    this.recipes.subscribe(snapshot=>{
      snapshot.forEach(snapshot=>{
      this.key.push(Object.keys(snapshot));
      });
    });
  }

  goToDetails(product,index){
    console.log(this.key[index][0]);
    console.log(index);
    this.router.navigate(["/recipedetails",this.key[index][0]]);     
  }

}
