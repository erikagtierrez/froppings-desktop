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
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Component({
  selector: "app-ingredientsdetails",
  templateUrl: "./ingredientsdetails.component.html",
  styleUrls: ["./ingredientsdetails.component.css"]
})
export class IngredientsdetailsComponent implements OnInit {
  ingredients: any;
  selectedUnit: any;
  id: any;
  @Input() name: string;
  @Input() price: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase          
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.ingredients = this.afoDatabase
    .object("ingredients/"+this.id+"/").subscribe(snapshots => {
      var items:any=snapshots;
        this.name = items.name; 
        this.price = items.price;
        this.selectedUnit=items.unit;        
    });
  }

  saveIngredient() {
    this.afoDatabase
    .list("ingredients/").update(this.id, {
      name: this.name,
      price: this.price,
      unit: this.selectedUnit      
    });
    this.router.navigateByUrl("/ingredients");
  }

  deleteIngredient() {
    console.log(this.id);
    this.afoDatabase
    .list("ingredients/").remove(this.id);
    this.router.navigateByUrl("/ingredients");
  }
}
