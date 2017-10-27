import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import { IMyDrpOptions } from "mydaterangepicker";
import swal from "sweetalert2";
import * as moment from "moment";
import { 
  FirebaseListObservable, 
  AngularFireDatabase 
} from "angularfire2/database";
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import randomize from "randomatic";

@Component({
  selector: "app-new-promotion",
  templateUrl: "./new-promotion.component.html",
  styleUrls: ["./new-promotion.component.css"]
})
export class NewPromotionComponent implements OnInit {
  promoType: boolean = true;
  code: any = "";
  name: any = "";
  discount: any;
  discountPercent: any;
  minPurchaseCoupon: any;
  minPurchase: any;
  exist: any = null;
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: "dd/mm/yyyy",
    maxYear: new Date().getUTCFullYear() + 1,
    disableUntil: {
      year: new Date().getUTCFullYear(),
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate() - 1
    }
  };
  private model: any = {
    beginDate: {
      year: new Date().getUTCFullYear(),
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate()
    },
    endDate: {
      year: new Date().getUTCFullYear() + 1,
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate()
    }
  };
  private model2: any = {
    beginDate: {
      year: new Date().getUTCFullYear(),
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate()
    },
    endDate: {
      year: new Date().getUTCFullYear() + 1,
      month: new Date().getUTCMonth(),
      day: new Date().getUTCDate()
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                                                          
  ) {}

  ngOnInit() {}

  genCode() {
    this.exist = null;
    var codex = randomize("Aa0", 4);
    this.afoDatabase
      .list("/promotions", {
        query:{
          orderByChild:"code",
          equalTo:codex
        }
      })
      .subscribe(result => (this.exist = true));
    if (this.exist == null) {
      this.code = codex;
    } else {
      this.genCode();
    }
  }

  revertChanges() {
    this.router.navigateByUrl("/promotions");
  }

  savePromo() {
    if (!this.promoType && (this.code == "" || this.discountPercent > 99)) {
      console.log("hey");
      swal({
        title: "Algo anda mal!",
        text:
          "El % de descuento es mayor a 99 o no has generado el código de cupón",
        type: "error",
        confirmButtonText: "Ok!"
      });
    }else{
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas crear la promoción?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
      if (this.promoType) {
        this.afoDatabase.list("/promotions").push({
          created:moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
          name: this.name,
          dateStart: this.model.beginDate.day+"/"+this.model.beginDate.month+"/"+this.model.beginDate.year,
          dateEnd: this.model.endDate.day+"/"+this.model.endDate.month+"/"+this.model.endDate.year,
          discount: this.discount,
          minPurchase: this.minPurchase,
          type: "promo"
        });
      } else {
        this.afoDatabase.list("/promotions").push({
          created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
          code: this.code,
          dateStart: this.model2.beginDate.day+"/"+this.model2.beginDate.month+"/"+this.model2.beginDate.year,
          dateEnd: this.model2.endDate.day+"/"+this.model2.endDate.month+"/"+this.model2.endDate.year,
          discount: this.discountPercent,
          minPurchase: this.minPurchaseCoupon,
          type: "coupon"
        });
      }
      this.router.navigateByUrl("/promotions");
    });
  }
}
}
