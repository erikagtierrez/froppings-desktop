import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import * as moment from "moment";
import { IMyDrpOptions } from "mydaterangepicker";
import swal from "sweetalert2";
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
  selector: "app-promotion-details",
  templateUrl: "./promotion-details.component.html",
  styleUrls: ["./promotion-details.component.css"]
})
export class PromotionDetailsComponent implements OnInit {
  promoType: any;
  code: any = "";
  name: any = "";
  discount: any;
  discountPercent: any;
  minPurchaseCoupon: any;
  minPurchase: any;
  dateStart: any;
  dateEnd: any;
  exist: any = null;
  id:any;
  private model: any;
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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                                              
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.afoDatabase
      .object("/promotions/"+this.id)
      .subscribe(snapshots => {
        var items:any=snapshots;
          console.log(items+"!")
          this.name=items.name;
          this.code=items.code;
          this.dateEnd=items.dateEnd;
          this.dateStart=items.dateStart;
          this.discount=items.discount;
          this.discountPercent=items.discount;
          this.minPurchase=items.minPurchase;
          this.minPurchaseCoupon=items.minPurchase;
          this.promoType=items.type;
          console.log(this.dateEnd);
          console.log(this.promoType);
          var datePartEnd = this.dateEnd.split("/");
          var datePartStart = this.dateStart.split("/");
          console.log(datePartEnd[0]+"-"+datePartEnd[1]+"-"+datePartEnd[2]);
          this.model = {
            beginDate: {
              year: datePartStart[2],
              month: datePartStart[1],
              day: datePartStart[0]
            },
            endDate: {
              year: datePartEnd[2],
              month: datePartEnd[1],
              day: datePartEnd[0]
            }
          };        
      }); 
  }

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

  deletePromo() {
    this.afoDatabase.list("promotions").remove(this.id);
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
    } else {
      swal({
        title: "Hey!",
        text: "¿Estas seguro que deseas guardar los cambios realizados a la promoción?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "No, volver"
      }).then(_ => {
        if (this.promoType=="promo") {
          this.afoDatabase.list("/promotions").update(this.id,{
            created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
            name: this.name,
            dateStart:
              this.model.beginDate.day +
              "/" +
              this.model.beginDate.month +
              "/" +
              this.model.beginDate.year,
            dateEnd:
              this.model.endDate.day +
              "/" +
              this.model.endDate.month +
              "/" +
              this.model.endDate.year,
            discount: this.discount,
            minPurchase: this.minPurchase,
            type: "promo"
          });
        } else {
          this.afoDatabase.list("/promotions").update(this.id,{
            created:  moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
            code: this.code,
            dateStart:
              this.model.beginDate.day +
              "/" +
              this.model.beginDate.month +
              "/" +
              this.model.beginDate.year,
            dateEnd:
              this.model.endDate.day +
              "/" +
              this.model.endDate.month +
              "/" +
              this.model.endDate.year,
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
