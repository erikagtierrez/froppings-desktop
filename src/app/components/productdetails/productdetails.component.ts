import { NewproductComponent } from "./../newproduct/newproduct.component";
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
import { AngularFirestore } from "angularfire2/firestore";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.css"]
})
export class ProductdetailsComponent implements OnInit {
  private product: any;
  private image: string;
  private ingredients: Array<string> = [];
  private ingredientsQuery: any;
  private ingredientsList: Array<string> = [];
  private recipe: Observable<any[]>;
  private recipeRef: AngularFireList<any>;
  private sub: any;
  private id: string;
  private oldIngredient: any;
  private oldProduct: any;
  @Input() name: string;
  @Input() category: number = 0;
  @Input() description: string;
  @Input() price: number;
  @Input() points: number;
  happened: boolean = false;
  @Input() quantity: number;
  selectedIngredient: string = "";
  pointsToMoney:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  getAvailableIngredients() {
    this.quantity=0;
    this.ingredients = [];
    this.ingredientsList = [];
    this.database
      .list("/recipe/" + this.id)
      .valueChanges()
      .subscribe(snapshots => {
        var items: any;
        var numberItems: any = [];
        items = snapshots;
        items.forEach(snapshots => {
          this.ingredientsList.push(snapshots.name);
          numberItems.push(snapshots.quantity);
        });
        this.ingredientsQuery = this.database
          .list("/ingredients")
          .valueChanges()
          .subscribe(snapshot => {
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
    this.id = this.route.snapshot.params["id"];
    this.product = this.database
      .list("/products", ref => ref.orderByChild("code").equalTo(this.id))
      .valueChanges();
    this.product.subscribe(snapshots => {
      var items: any;
      items = snapshots;
      this.oldProduct = snapshots;
      items.forEach(snapshots => {
        this.name = snapshots.name;
        this.image = snapshots.image;
        this.description = snapshots.description;
        this.points = snapshots.points;
        this.price = snapshots.price;
      });
    });
    this.recipeRef = this.database.list("/recipe/" + this.id);
    this.recipe = this.recipeRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.database
      .list("/recipe/" + this.id)
      .valueChanges()
      .subscribe(snapshots => {
        if (!this.happened) {
          this.oldIngredient = snapshots;
          this.happened = true;
        }
      });
    this.getAvailableIngredients();
  }

  addIngredient(ingredient) {
    this.database.list("/recipe/" + this.id).push({
      name: ingredient,
      quantity: this.quantity
    });
    this.getAvailableIngredients();
    this.quantity = null;
  }

  modifyIngredientElement(ingredient, key) {
    var thix = this;
    swal({
      title: "Agrega la cantidad:",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar",
      input: "number",
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
      cant => {
        console.log(this.id);
        console.log(ingredient);
        this.database.list("/recipe/" + this.id).set(ingredient.key, {
          name: ingredient.name,
          quantity: cant
        });
        console.log("Modified");
      },
      function(dismiss) {
        if (dismiss === "cancel") {
          console.log("Upss! Not modified");
        }
      }
    );
  }

  deleteIngredientElement(product, key) {
    this.recipeRef.remove(key);
    this.getAvailableIngredients();
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.image = "data:image/jpeg;base64," + btoa(binaryString);
  }

  revertChanges() {
    if (this.oldIngredient) {
      var some = [];
      this.oldIngredient.forEach(element => {
        some.push(element);
      });
      console.log(this.oldIngredient);
      this.database.list("/recipe/" + this.id).remove();
      this.database.list("/recipe/").push(some);
      this.router.navigateByUrl("/products");
    } else {
      this.router.navigateByUrl("/products");
    }
  }

  saveProduct(product, key) {
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas guardar información de producto?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
      this.product = this.database.list("/products").set(this.id, {
        code: product.code,
        description: this.description,
        image: this.image,
        name: this.name,
        points: ((this.price/this.pointsToMoney).toFixed(0)),
        price: this.price.toFixed(0),
        type: this.category.toFixed(0)
      });
      this.router.navigateByUrl("/products");
    });
  }
}
