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
  selector: "app-newproduct",
  templateUrl: "./newproduct.component.html",
  styleUrls: ["./newproduct.component.css"]
})
export class NewproductComponent implements OnInit {
  ingredientsList: any[];
  recipe: any;
  key: any;
  image:any="assets/img/productodefault.png";
  saved: boolean=false;
  product: firebase.database.ThenableReference;
  ingredients: any[]=[];
  @Input() quantity: number;
  selectedIngredient: string="";
  @Input() name: string;
  @Input() category: number=0;
  @Input() description: string;
  @Input() price: number;
  @Input() points: number;
  pointsToMoney:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.database
    .list("config/")
    .valueChanges()
    .subscribe(snapshots => {
      var value: any;
      value = snapshots;
      value.forEach(action => {
        console.log(action.pointsToMoney);
        this.pointsToMoney = action.pointsToMoney;
      });
    });
    this.key = this.database.list("/products").push({
      image:
        "~/assets/productodefault.png"
    }).key;
    console.log(this.key);
    this.database
      .list("/ingredients").valueChanges()
      .subscribe(snapshots => {
        var items:any=snapshots;
        items.forEach(snapshots => {
            console.log(snapshots.name);
          this.ingredients.push(snapshots.name);
        });
      });
  }

  getAvailableIngredients() {
    this.category=0;
    this.ingredients = [];
    this.ingredientsList = [];
    this.database.list("/recipe/" + this.key).valueChanges().subscribe(snapshots => {
      var items: any;
      var numberItems: any = [];
      items = snapshots;
      items.forEach(snapshots => {
        this.ingredientsList.push(snapshots.name);
        numberItems.push(snapshots.quantity);
      });
      this.database.list("/ingredients").valueChanges().subscribe(snapshot => {
        var item: any;
        item = snapshot;
        var key = 0;
        item.forEach(snapshot => {
          if (this.ingredientsList.indexOf(snapshot.name) == -1) {
            this.ingredients.push(snapshot.name);
          } else {
            console.log(snapshot.price + "," + numberItems[key]);
            this.category += snapshot.price * numberItems[key];
            key++;
          }
        });
      });
  });
  }

  addIngredient(ingredient) {
    this.database.list("/recipe/" + this.key).push({
      name: ingredient,
      quantity: this.quantity
    });
    this.recipe=this.database.list("/recipe/" + this.key).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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
      this.database.list("/recipe/" + this.key).set(key,{
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

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.image= 'data:image/jpeg;base64,'+btoa(binaryString);
  }

  deleteIngredientElement(product,key){
    this.database.list("/recipe/" + this.key).remove(key);
    this.getAvailableIngredients();    
  }

  revertChanges(){
    this.database.list("/products/"+this.key).remove();
    this.database.list("/recipe/"+this.key).remove();
    this.router.navigateByUrl("/products");    
  }

  ngOnDestroy(){
    if(!this.saved){
    this.database.list("/products/"+this.key).remove(); 
    }   
  }

  saveProduct(product){
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas crear el producto?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
    this.saved=true;
    this.database.list("/products").update(this.key,{
        "code":this.key,
        "description":this.description,
        "image":this.image,
        "name":this.name,
        "points":new Number(((this.price/this.pointsToMoney).toFixed(2))),
        "price":this.price.toFixed(0),
        "type":this.category.toFixed(0)
    });
    this.router.navigateByUrl("/products");  
  });    
}
}
