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
  selector: "app-newingredient",
  templateUrl: "./newingredient.component.html",
  styleUrls: ["./newingredient.component.css"]
})
export class NewingredientComponent implements OnInit {
  ingredients: any;
  selectedUnit: any;
  @Input() name: string;
  @Input() price: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase              
  ) {}

  ngOnInit() {}

  saveIngredient() {
    this.ingredients = this.afoDatabase.list("/ingredients");
    this.ingredients.push({
      name: this.name,
      price: this.price,
      unit: this.selectedUnit
    });
    this.router.navigateByUrl("/ingredients");    
  }
}
