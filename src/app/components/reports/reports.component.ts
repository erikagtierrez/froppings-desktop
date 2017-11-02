import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import swal from "sweetalert2";
import * as moment from "moment";
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase
} from "angularfire2-offline/database";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit {
  items: any;
  month: any;
  orders: any;
  rules: any = { id: "", type: "", created: "" };
  orderList: any = [];
  productsList: any = [];
  itemsList: any = [];
  cantList: any = [];
  greater: any = 0;
  greaterIndex: any = 0;
  less: any = 1000000;
  lessIndex: any = 0;
  productSoldOut: any = [];
  productNotSoldOut: any = [];
  reportType: any = "home";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase
  ) {}

  ngOnInit() {
    var monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    var d = new Date();
    this.month = monthNames[d.getMonth()];
    this.items = this.afoDatabase.list("/orders").subscribe(item => {
      var orders: any = item;
      orders.forEach((element, key) => {
        var products = element.products;
        products.forEach(element => {
          if (this.productsList.indexOf(element.code) == -1) {
            this.productsList.push(element.code);
            this.cantList.push(parseInt(element.quantity));
          } else {
            this.cantList[this.productsList.indexOf(element.code)] += parseInt(
              element.quantity
            );
          }
        });
      });
      this.cantList.forEach((element, key) => {
        console.log(this.greater + "," + element + "," + this.less);
        if (this.greater < element) {
          this.greaterIndex = key;
          this.greater = element;
        }
        if (this.less > element) {
          this.less = element;
          this.lessIndex = key;
        }
      });
      this.items = this.afoDatabase
        .object("/products/" + this.productsList[this.greaterIndex])
        .subscribe(item => {
          var product: any = item;
          this.productSoldOut = {
            name: product.name,
            code: product.code,
            points: product.points,
            price: product.price,
            image: product.image
          };
        });
      this.items = this.afoDatabase
        .object("/products/" + this.productsList[this.lessIndex])
        .subscribe(item => {
          var product: any = item;
          this.productNotSoldOut = {
            name: product.name,
            code: product.code,
            points: product.points,
            price: product.price,
            image: product.image
          };
        });
    });
    this.orders = this.afoDatabase.list("/orders").subscribe(value => {
      var order: any = value;
      var userType: any;
      var userName: any;
      var userId: any;
      order.forEach(element => {
        console.log(element.user);
        if (element.user) {
          this.itemsList.push(element.products);
          userType = "Usuario registrado";
          this.afoDatabase.object("/users/" + element.user).subscribe(value => {
            var info: any = value;
            userName = info.name + " " + info.lastname;
            userId = info.id;
            this.orderList.push({
              created: element.created,
              type: "Usuario registrado",
              name: userName,
              id: userId,
              products: element.products,
              points: element.points,
              total: element.total
            });
          });
        } else {
          userType = "Usuario rápido";
          userName = element.name + " " + element.lastname;
          userId = element.id;
          this.itemsList.push(element.products);
          this.orderList.push({
            created: element.created,
            type: userType,
            name: userName,
            id: userId,
            products: element.products,
            points: element.points,
            total: element.total
          });
        }
      });
    });
  }
}
