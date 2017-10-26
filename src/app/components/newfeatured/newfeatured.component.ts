import { NewproductComponent } from "./../newproduct/newproduct.component";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import { OrderProduct } from "../productspopup/orderProduct";
import * as firebase from "firebase/app";
import swal from "sweetalert2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore } from "angularfire2/firestore";

@Component({
  selector: "app-newfeatured",
  templateUrl: "./newfeatured.component.html",
  styleUrls: ["./newfeatured.component.css"]
})
export class NewfeaturedComponent implements OnInit {
  promoType: any = "image";
  image: any = "assets/img/productodefault.png";
  messageImagePost: any;
  messageTitle: any;
  messageDescription: any;
  products: any;
  promotions: any;
  selectedProduct: any;
  selectedPromotion: any;
  selectedCoupon:any;
  coupons:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.products = this.database.list("/products").valueChanges();
    this.promotions = this.database.list("/promotions", ref=> ref.orderByChild("type").equalTo("promo")).valueChanges();
    this.coupons = this.database.list("/promotions", ref=> ref.orderByChild("type").equalTo("coupon")).valueChanges();
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

  savePost() {
    if (this.promoType == "image") {
      this.database.list("/featured").push({
        type: "image",
        image: this.image,
        name: this.messageImagePost
      });
      this.router.navigateByUrl("/featured");
    } else if (this.promoType == "message") {
      this.database.list("/featured").push({
        type: "message",
        name: this.messageTitle,
        description: this.messageDescription
      });
      this.router.navigateByUrl("/featured");
    } else if (this.promoType == "product") {
      console.log(this.selectedProduct);
      if (this.selectedProduct) {
        this.database
          .list("/products", ref =>
            ref.orderByChild("name").equalTo(this.selectedProduct)
          )
          .valueChanges()
          .subscribe(result => {
            var product: any = result;
            product.forEach(element => {
              this.database.list("/featured").push({
                type: "product",
                name: element.name,
                description: element.description,
                image: element.image,
                points: element.points,
                price: element.price
              });
            });
          });
        this.router.navigateByUrl("/featured");
      }
    } else if (this.promoType == "promo") {
      if (this.selectedPromotion) {
        this.database
          .list("/promotions", ref =>
            ref.orderByChild("name").equalTo(this.selectedPromotion)
          )
          .valueChanges()
          .subscribe(result => {
            var promo: any = result;
            promo.forEach(element => {
              this.database.list("/featured").push({
                type: "promo",
                name: element.name,
                dateEnd: element.dateEnd,
                dateStart: element.dateStart,
                discount: element.discount,
                minPurchase: element.minPurchase
              });
            });
          });
        this.router.navigateByUrl("/featured");
      }
    }else if(this.promoType=='coupon'){
      if(this.selectedCoupon){
        this.database
        .list("/promotions", ref =>
          ref.orderByChild("code").equalTo(this.selectedCoupon)
        )
        .valueChanges()
        .subscribe(result => {
          var promo: any = result;
          promo.forEach(element => {
            this.database.list("/featured").push({
              type: "coupon",
              code: element.code,
              dateEnd: element.dateEnd,
              dateStart: element.dateStart,
              discount: element.discount,
              minPurchase: element.minPurchase
            });
          });
        });
      this.router.navigateByUrl("/featured");
      }
    }
  }
}
