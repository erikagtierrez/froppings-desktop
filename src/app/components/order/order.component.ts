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
import { 
  FirebaseListObservable, 
  AngularFireDatabase 
} from "angularfire2/database";
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database'; 
import * as moment from "moment";
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  info: any;
  gotData: boolean = false;
  found: boolean = false;
  @Input() idSearch: number;
  @Input() orderType: boolean = null;
  @Input() userName: string;
  @Input() userId: number;
  @Input() cant: number;
  @Input() userLastname: string;
  @Input() userAddress: string;
  @Input() couponCode: string;
  @Input() userPhone: number;
  userData: any;
  userDataUID: any;
  points: number = 0;
  productCount: number = 0;
  savedInfo: any;
  orderTotal: number;
  productList: any;
  pointsCount: number = 0;
  discountButton = "Aplicar Descuento";
  discount: number=0;
  pointsTotal: number = 0;
  pointsToMoney: any;
  address: any;
  rif: any;
  iva: any;
  isPromoCode = true;
  promotions = [];
  promotionSelected: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase    
    
  ) {
    this.pointsToMoney = this.database
      .list("config/")
      .subscribe(snapshots => {
        var value: any;
        value = snapshots;
        value.forEach(action => {
          console.log(action.pointsToMoney);
          this.pointsToMoney = action.pointsToMoney;
          this.address = action.address;
          this.rif = action.rif;
          this.iva = action.iva;
        });
      });
  }

  //Verify params recieved
  ngOnInit() {
    try {
      this.savedInfo = JSON.parse(localStorage.getItem("currentUser"));
      this.userName = this.savedInfo.name;
      this.userLastname = this.savedInfo.lastname;
      this.userAddress = this.savedInfo.address;
      this.userPhone = this.savedInfo.phonenumer;
      this.userId = this.savedInfo.id;
      this.idSearch = this.savedInfo.pointsId;
      this.points = this.savedInfo.points;
      this.userDataUID = this.savedInfo.uid;
      this.productList = JSON.parse(localStorage.getItem("currentOrder"));
      if (this.productList) {
        this.productCount += 1;
        this.gotData = true;
        this.getOrderTotal();
      }
      //Get promotions
      this.promotions = [];
      const promotionsQuery = this.afoDatabase
        .list("promotions", {
          query:{
            orderByChild:"type",
            equalTo:"promo"
          }
        }).subscribe(snapshots => {
          var promo: any;
          promo = snapshots;
          console.log("Promo:" + JSON.stringify(promo));
          promo.forEach(re => {
            this.promotions.push(re.name);
          });
        });
    } catch (ex) {}
  }

  getUserData() {
    const user = this.afoDatabase
      .list("users", {
        query:{
          orderByChild:"id",
          equalTo:this.idSearch
        }
      }
      ).subscribe(snapshots => {
        snapshots.forEach(action => {
          console.log(action.$key);
          this.userDataUID = action.$key;
        });
      });
    const userPoints = this.afoDatabase
      .list("users", {
        query:{
          orderByChild:"id",
          equalTo:this.idSearch
        }
      }
      )
      .subscribe(snapshots => {
        var user: any;
        user = snapshots;
        console.log("USER:" + JSON.stringify(user));
        user.forEach(re => {
          this.userName = re.name;
          this.userLastname = re.lastname;
          this.userAddress = re.direction;
          this.userPhone = re.phonenumer;
          this.userId = re.id;
          this.points = re.points;
        });
        this.gotData = true;
        this.found = true;
        this.productList = null;
        this.productCount = 0;
        this.productList = localStorage.removeItem("currentOrder");
      });
    setTimeout(re => {
      if (!this.found) {
        this.userName = "";
        this.userLastname = "";
        this.userAddress = "";
        this.userPhone = null;
        this.userId = null;
        this.productList = null;
        this.productCount = 0;
        this.productList = localStorage.removeItem("currentOrder");        
        swal({
          title: "Algo anda mal!",
          text: "No existe usuario registrado con ese numero de cedula",
          type: "error",
          confirmButtonText: "Ok!"
        });
      }
    }, 1500);
    this.found = false;
  }

  addProducts() {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: this.userId,
        name: this.userName,
        lastname: this.userLastname,
        address: this.userAddress,
        phonenumer: this.userPhone,
        pointsId: this.idSearch,
        points: this.points,
        uid: this.userDataUID
      })
    );
    this.router.navigateByUrl("/productspopup");
  }

  getOrderTotal() {
    this.orderTotal = 0;
    this.pointsCount = 0;
    this.productList.forEach(element => {
      this.orderTotal = this.orderTotal + element.quantity * element.price;
      this.pointsCount = this.pointsCount + element.points * element.quantity;
    });
  }

  modifyOrderElement(product, index) {
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
      (cant)=> {
        thix.productList = JSON.parse(localStorage.getItem("currentOrder"));
        thix.productList.splice(index, 1);
        thix.productList.push(
          new OrderProduct(
            product.code,
            product.name,
            cant,
            product.price,
            product.points
          )
        );
        console.log(JSON.stringify(thix.productList));
        console.log("Added to Order");
        localStorage.setItem("currentOrder", JSON.stringify(thix.productList));
        this.productList = JSON.parse(localStorage.getItem("currentOrder"));
        this.getOrderTotal();
      },
      (dismiss)=> {
        if (dismiss === "cancel") {
          console.log("Upss! Not added");
        }
      }
    );
  }

  deleteOrderElement(product, index) {
    this.productList.splice(index, 1);
    this.productCount = this.productList.length;
    localStorage.setItem("currentOrder", JSON.stringify(this.productList));
    this.getOrderTotal();
  }

  savePayment() {
    swal({
      title: 'Hey!',
      text: "¿Estas seguro que deseas crear la orden?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, volver',
    }).then( _ => {
    const userToUpdate = this.afoDatabase.list("users/");
    userToUpdate.update(this.userDataUID, { points: this.pointsTotal });
    localStorage.removeItem("currentOrder");
    swal({
      title: "Orden Creada!",
      type: "success",
      confirmButtonText: "Ok!"
    });
      this.setupOrderPDF();
    this.userName = "";
    this.userLastname = "";
    this.userAddress = "";
    this.userPhone = null;
    this.userId = null;
    this.idSearch = null;
    this.points = 0;
    this.gotData = false;
    this.found = false;
    this.productList = null;
    this.productCount = 0;
    this.productList = localStorage.removeItem("currentOrder");    
    console.log("success");
  })
  }

  applyCoupon() {
    if (this.isPromoCode && this.couponCode) {
      //Coupon
      var dateEnd: any;
      var today = new Date(Date.now());
      var minPurchase: any;
      this.getOrderTotal();
      this.discountButton = "Aplicar Descuento";
      const coupon = this.afoDatabase
        .list("promotions", {
          query:{
            orderByChild:"code",
            equalTo: this.couponCode.toString()
          }
          })
        .subscribe(snapshots => {
          var promo: any;
          promo = snapshots;
          console.log("Promo:" + JSON.stringify(promo));
          promo.forEach(re => {
            this.discount = re.discount;
            dateEnd = re.dateEnd;
            minPurchase = re.minPurchase;
          });
          var datePartEnd = dateEnd.split("/");
          dateEnd = new Date(
            datePartEnd[2],
            datePartEnd[1] - 1,
            datePartEnd[0]
          );
          if (today <= dateEnd && this.orderTotal > minPurchase) {
            this.orderTotal =
              this.orderTotal - this.orderTotal * (this.discount / 100);
            this.discountButton = "Quitar Descuento";
            this.couponCode = "";
          } else {
            swal({
              title: "Algo anda mal!",
              text:
                "Fechas de promocion no validas o monto no cumple el requerido!",
              type: "error",
              confirmButtonText: "Ok!"
            });
          }
        });
    } else if (!this.isPromoCode && this.promotionSelected) {
      //Discount Promotion
      console.log(this.promotionSelected);
      this.getOrderTotal();
      const coupon = this.afoDatabase
        .list("promotions",{
          query:{
            orderByChild:"name",
            equalTo:this.promotionSelected
          }
        }
        )
        .subscribe(snapshots => {
          var promo: any;
          var dateStart: any;
          var dateEnd: any;
          var today = new Date(Date.now());
          var minPurchase: any;
          promo = snapshots;
          console.log("Promo:" + JSON.stringify(promo));
          promo.forEach(re => {
            this.discount = re.discount;
            dateEnd = re.dateEnd;
            dateStart = re.dateStart;
            minPurchase = re.minPurchase;
          });
          var datePartsStart = dateStart.split("/");
          var datePartEnd = dateEnd.split("/");
          dateStart = new Date(
            datePartsStart[2],
            datePartsStart[1] - 1,
            datePartsStart[0]
          );
          dateEnd = new Date(
            datePartEnd[2],
            datePartEnd[1] - 1,
            datePartEnd[0]
          );
          console.log(dateStart + "," + today + "," + dateEnd);
          console.log(today >= dateStart);
          console.log(today <= dateEnd);
          console.log(dateEnd >= today && today >= dateStart);
          console.log(this.orderTotal + "," + minPurchase);
          if (
            dateEnd >= today &&
            today >= dateStart &&
            this.orderTotal > minPurchase
          ) {
            this.orderTotal = this.orderTotal - this.discount;
            this.discountButton = "Quitar Descuento";
          } else {
            swal({
              title: "Algo anda mal!",
              text:
                "Fechas de promocion no validas o monto no cumple el requerido!",
              type: "error",
              confirmButtonText: "Ok!"
            });
          }
        });
    } else if (this.discountButton == "Quitar Descuento") {
      this.getOrderTotal();
      this.discountButton = "Aplicar Descuento";
    }
  }


  setupOrderPDF() {
    // playground requires you to assign document definition to a variable called d;
    var columnsName: any = [];
    var ivaTotal = this.orderTotal * (this.iva / 100);
    var subTotal = this.orderTotal - ivaTotal;
    this.productList.forEach((element, key) => {
      columnsName.push({
        columns: [
          { width: 220, text: element.name +" ("+element.quantity+")"},
          {
            alignment: "right",
            text: "Bs. " + Number(element.price).toLocaleString()
          }
        ]
      });
    });
    console.log(columnsName);
    var docDefinition = {
      pageSize: { width: 380, height: "auto" },
      content: [
        { text: "SENIAT", style: "boldcenter" },
        { text: this.rif, style: "center" },
        { text: "FROPPINGS", style: "header" },
        { text: "FROPPINGS, FP", style: "center" },
        { text: this.address, style: "direccion" },
        { text: "Fecha: "+moment(new Date()).format("DD/MM/YYYY h:mm:ss"), style: "" },        
        { text: "Información del Cliente", style: "bold" },
        {
          text: "Nombre del Cliente: " + this.userName + " " + this.userLastname
        },
        { text: "RIF/CI: V-" + this.userId },
        { text: "FACTURA", style: "boldcenter" },
        {
          text:
            "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ",
          style: "paddingbottom"
        },
        columnsName,
        {
          text:
            "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ",
          style: "paddingbottom"
        },{
          columns: [
            {
              width: 220,
              text: "Descuento"
            },
            {
              text: "Bs. " + this.discount,
              alignment: "right"
            }
          ]
        },
        {
          columns: [
            {
              width: 220,
              text: "BI A (" + this.iva + "%)"
            },
            {
              text: "Bs. " + this.orderTotal.toLocaleString(),
              alignment: "right"
            }
          ]
        },
        {
          columns: [
            {
              width: 220,
              text: "IVA A (" + this.iva + "%)"
            },
            {
              text: "Bs. " + ivaTotal.toLocaleString(),
              alignment: "right"
            }
          ]
        },
        {
          text:
            "_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ",
          style: "paddingbottom"
        },
        {
          alignment: "justify",
          columns: [
            {
              width: 210,
              style: "boldBig",
              text: "TOTAL"
            },
            {
              style: "boldBig",
              text: "Bs. " + subTotal.toLocaleString(),
              alignment: "right"
            }
          ]
        },
        { text: "Gracias por su visita.", style: "center" }
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center"
        },
        boldcenter: {
          bold: true,
          alignment: "center"
        },
        bold: {
          bold: true
        },
        boldBig: {
          bold: true,
          fontSize: 14,
          margin: [0, 0, 0, 20]
        },
        direccion: {
          margin: [20, 0, 20, 10],
          alignment: "center"
        },
        center: {
          alignment: "center"
        },
        paddingbottom: {
          margin: [0, 0, 0, 10]
        },
        anotherStyle: {
          italic: true,
          alignment: "right"
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
  }

  confirm() {
    var totalValue;
    var promise: any;
    console.log(this.productList);
    console.log(this.pointsCount);
    console.log(this.pointsTotal);
    console.log(this.points);
    if (this.orderType == null) {
      swal({
        title: "Algo anda mal!",
        text: "Debe elegir si acumula o canjea puntos!",
        type: "error",
        confirmButtonText: "Ok!"
      });
    } else {
      if (this.orderType) {
        this.pointsTotal = this.pointsCount + this.points;
        promise = this.afoDatabase
          .list("orders")
          .push({
            created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
            points: this.pointsCount,
            products: this.productList,
            total: this.orderTotal,
            user: this.userId
          })
          .then(_ => this.savePayment());
      } else {
        if (this.points < this.pointsCount) {
          totalValue = (this.pointsCount - this.points) * this.pointsToMoney;
          this.discount+=this.points* this.pointsToMoney;        
          this.pointsTotal = 0;
          promise = this.afoDatabase
            .list("orders")
            .push({
              created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
              points: this.pointsCount,
              products: this.productList,
              total: totalValue,
              user: this.fireAuth.auth.currentUser.uid
            })
            .then(_ => this.savePayment());
        } else {
          this.pointsTotal = this.points - this.pointsCount;
          this.discount+=this.pointsCount*this.pointsToMoney;                  
          promise = this.database
            .list("orders")
            .push({
              created: moment(new Date()).format("DD/MM/YYYY h:mm:ss"),
              points: this.pointsCount,
              products: this.productList,
              total: 0,
              user: this.fireAuth.auth.currentUser.uid
            })
            .then(_ => this.savePayment());
        }
      }
      console.log(this.orderType);
    }
  }
}
