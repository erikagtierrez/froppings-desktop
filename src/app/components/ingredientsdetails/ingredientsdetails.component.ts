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
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: "app-ingredientsdetails",
  templateUrl: "./ingredientsdetails.component.html",
  styleUrls: ["./ingredientsdetails.component.css"]
})
export class IngredientsdetailsComponent implements OnInit {
  ingredients: any;
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
    this.ingredients = this.database
    .list("ingredients/"+this.id+"/").valueChanges().subscribe(snapshots => {
      var items:any=snapshots;
        this.name = items[0]; 
        this.price = items[1];        
    });
  }

  saveIngredient() {
    this.database
    .list("ingredients/").set(this.id, {
      name: this.name,
      price: this.price
    });
    this.router.navigateByUrl("/ingredients");
  }

  deleteIngredient() {
    console.log(this.id);
    this.database
    .list("ingredients/").remove(this.id);
    this.router.navigateByUrl("/ingredients");
  }
}
