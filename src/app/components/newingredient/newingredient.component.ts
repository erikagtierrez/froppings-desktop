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
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {}

  saveIngredient() {
    this.ingredients = this.database.list("/ingredients");
    this.ingredients.push({
      name: this.name,
      price: this.price,
      unit: this.selectedUnit
    });
    this.router.navigateByUrl("/ingredients");    
  }
}
