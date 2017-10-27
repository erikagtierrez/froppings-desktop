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
import * as moment from "moment";

@Component({
  selector: "app-new-purchase",
  templateUrl: "./new-purchase.component.html",
  styleUrls: ["./new-purchase.component.css"]
})
export class NewPurchaseComponent implements OnInit {
  pointsToMoney: any;
  iva: any;
  ingredients: any = [];
  ingredientsList: any = [];
  products = [];
  @Input() quantity: number;
  @Input() price: number;
  selectedIngredient: string = "";
  purchaseTotal: any = 0;
  @Input() name: string;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                                                      
  ) {}

  ngOnInit() {
    this.afoDatabase
      .list("config/")
      .subscribe(snapshots => {
        var value: any;
        value = snapshots;
        value.forEach(action => {
          console.log(action.pointsToMoney);
          this.pointsToMoney = action.pointsToMoney;
          this.iva = action.iva;
        });
      });
    this.afoDatabase
      .list("/ingredients")
      .subscribe(snapshots => {
        var items: any = snapshots;
        items.forEach(snapshots => {
          console.log(snapshots.name);
          this.ingredients.push(snapshots.name);
        });
      });
  }

  updateTotal() {
    this.purchaseTotal = 0;
    this.products.forEach((element, key) => {
      this.purchaseTotal += element.price * element.quantity;
      console.log(element.price);
      console.log(element.quantity);
    });
    console.log(this.purchaseTotal);
    this.purchaseTotal =
      this.purchaseTotal - this.purchaseTotal * (this.iva / 100);
    console.log(this.products);
  }

  getAvailableIngredients() {
    this.ingredients = [];
    this.afoDatabase
      .list("/ingredients")
      .subscribe(snapshot => {
        var item: any;
        item = snapshot;
        var key = 0;
        item.forEach(snapshot => {
          if (this.ingredientsList.indexOf(snapshot.name) == -1) {
            this.ingredients.push(snapshot.name);
          }
        });
      });
  }

  addIngredient(ingredient) {
    console.log("hola");
    this.ingredients.push(ingredient);
    this.afoDatabase
      .list("/ingredients")
      .subscribe(snapshot => {
        var item: any;
        item = snapshot;
        var key = 0;
        item.forEach(snapshot => {
          if (snapshot.name == ingredient) {
            this.ingredientsList.push(ingredient);
            this.products.push({
              name: ingredient,
              price: this.price,
              quantity: this.quantity
            });
            console.log(this.products);
            this.getAvailableIngredients();
            this.updateTotal();
            this.quantity = null;
            this.price = null;
          }
        });
      });
    console.log(this.products);
  }

  modifyIngredientElement(ingredient) {
    swal({
      title: 'Agrega la cantidad:',
      showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Ok',
       cancelButtonText:
        'Cancelar',
        input: 'number',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value) {
              resolve()
            } else {
              reject('You need to write something!')
            }
          })
        }
    }).then((cant)=> { 
      swal({
        title: 'Agrega el precio:',
        showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Ok',
         cancelButtonText:
          'Cancelar',
          input: 'number',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value) {
                resolve()
              } else {
                reject('You need to write something!')
              }
            })
          }
      }).then((price)=> {  
    this.products.forEach((element,key) => {
      console.log(cant+","+key);
      console.log(element.name+","+ingredient.name);
      if(element.name==ingredient.name){
        this.products[key]=({
          name: ingredient.name,
          price: price,
          quantity: cant
        });
      console.log(cant+","+key);
      
      }
      this.getAvailableIngredients();
      this.updateTotal();
    });
  });
  });
  }

  deleteIngredientElement(ingredient){
    this.products.forEach((element,key) => {
      if(element.name==ingredient.name){
        this.products.splice(key,1);
      }
    });
    this.getAvailableIngredients();
    this.updateTotal();
  }

  revertChanges(){
    this.router.navigateByUrl("/products");        
  }

  savePurchase(){
    if(this.products.length!=0){
      swal({
        title: "Hey!",
        text: "¿Estas seguro que deseas crear la compra?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "No, volver"
      }).then(_ => {
        this.afoDatabase.list("/purchases").push({
          created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
          datetime:(moment().format('DD/MM/YYYY')),
          seller: this.name,
          total:this.purchaseTotal,
          products:this.products
      });
      this.router.navigateByUrl("/purchases");  
    });
    }else{
      swal({
        title: "Algo anda mal!",
        text: "No existen productos agregados a compra",        
        type: "warning",
        confirmButtonText: "Ok!"
      });    
    } 
  }
}
