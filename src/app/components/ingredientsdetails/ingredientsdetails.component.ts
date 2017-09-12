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
  selector: "app-ingredientsdetails",
  templateUrl: "./ingredientsdetails.component.html",
  styleUrls: ["./ingredientsdetails.component.css"]
})
export class IngredientsdetailsComponent implements OnInit {
  ingredients: FirebaseListObservable<any[]>;
  id: any;
  @Input() name: string;
  @Input() price: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.ingredients = this.database.list("/ingredients", {
      query: {
        orderByChild: "code",
        equalTo: this.id
      }
    });
    this.ingredients.subscribe(snapshots => {
      console.log(snapshots);
      snapshots.forEach(snapshots => {
        (this.name = snapshots.name), (this.price = snapshots.price);
      });
    });
  }

  saveIngredient(ingredient, key) {
    this.ingredients.update(key, {
      name: this.name,
      price: this.price
    });
    this.router.navigateByUrl("/ingredients");
  }

  deleteIngredient(ingredient, key) {
    console.log(key);
    
    this.ingredients.remove(key);
    this.router.navigateByUrl("/ingredients");
  }
}
