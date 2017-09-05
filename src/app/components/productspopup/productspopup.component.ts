import { NewproductComponent } from "./../newproduct/newproduct.component";
import { Router, RouterModule } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
import { OrderProduct } from "./orderProduct";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import { Location } from '@angular/common';
import swal from "sweetalert2";
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";

@Component({
  selector: "app-productspopup",
  templateUrl: "./productspopup.component.html",
  styleUrls: ["./productspopup.component.css"]
})
export class ProductspopupComponent implements OnInit {
  products: FirebaseListObservable<any[]>;
  orderProducts: Array<OrderProduct> = [];

  constructor(
    private router: Router,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    private location: Location
  ) {
    this.products = database.list("/products");
    this.orderProducts = JSON.parse(localStorage.getItem("currentOrder"));
  }

  ngOnInit() {}

  addToOrder(product) {
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
        var oldOrder = JSON.parse(localStorage.getItem("currentOrder"));
        oldOrder.forEach((element, i) => {
          if ((element.code == product.code)) {
            console.log("previouscode: "+element.code+","+product.code)
            oldOrder.splice(i, 1);
          }
        });
        oldOrder.push(
          new OrderProduct(product.code, product.name, cant, product.price)
        );
        console.log(JSON.stringify(oldOrder));
        console.log("Added to Order");
        localStorage.setItem("currentOrder", JSON.stringify(oldOrder));
        thix.location.back();
      },
      function(dismiss) {
        if (dismiss === "cancel") {
          console.log("Upss! Not added");
        }
      }
    );
  }
}
