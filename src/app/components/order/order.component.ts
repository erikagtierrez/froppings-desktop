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
import swal from 'sweetalert2'
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"]
})
export class OrderComponent implements OnInit {
  productos: any = [
    {
      nombre: "Producto 1",
      cantidad: "2",
      precio: "XXX"
    },
    {
      nombre: "Producto 2",
      cantidad: "1",
      precio: "XXX"
    },
    {
      nombre: "Producto 3",
      cantidad: "5",
      precio: "XXX"
    }
  ];
  info: any;
  gotData: boolean = false;
  @Input() idSearch: number;
  @Input() userName: string;
  @Input() userId: number;
  @Input() cant: number;
  @Input() userLastname: string;
  @Input() userAddress: string;
  @Input() userPhone: number;
  userData: FirebaseListObservable<any[]>;
  productCount: number = 0;
  savedInfo:any;
  orderTotal:number;
  productList:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {
  }

  //Verify params recieved
  ngOnInit() {
      try{
        this.savedInfo=JSON.parse(localStorage.getItem('currentUser')); 
        this.userName = this.savedInfo.name;
        this.userLastname = this.savedInfo.lastname;
        this.userAddress = this.savedInfo.address;
        this.userPhone = this.savedInfo.phonenumer;
        this.userId = this.savedInfo.id;
        this.idSearch=this.savedInfo.pointsId;

        this.productList=JSON.parse(localStorage.getItem('currentOrder')); 
        this.productCount+=1;
        this.gotData=true;
        this.getOrderTotal();
      }catch(ex){

      }
      
  }

  getUserData() {
    var userPoints = this.database
      .list("users", {
        query: {
          orderByChild: "id",
          equalTo: this.idSearch
        }
      })
      .subscribe(snapshots => {
        snapshots.forEach(snapshots => {
          this.userName = snapshots.name;
          this.userLastname = snapshots.lastname;
          this.userAddress = snapshots.direction;
          this.userPhone = snapshots.phonenumer;
          this.userId = snapshots.id;
        });
        this.gotData = true;
      });
  }

  addProducts() {
    localStorage.setItem('currentUser', JSON.stringify({
        id: this.userId,
        name: this.userName,
        lastname:this.userLastname,
        address:this.userAddress,
        phonenumer:this.userPhone,
        pointsId:this.idSearch    
    })); 
    this.router.navigateByUrl("/productspopup");
  }

  getOrderTotal(){
    this.orderTotal=0;
    this.productList.forEach(element => {
      this.orderTotal=this.orderTotal+(element.quantity*element.price);
    });
  }

  modifyOrderElement(product,index){
    var thix=this;
    swal({
      title: 'Agrega la cantidad:',
      showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Ok',
       cancelButtonText:
        'Cancelar',
        input: 'text',
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value) {
              resolve()
            } else {
              reject('You need to write something!')
            }
          })
        }
    }).then(function (cant) {
      thix.productList=JSON.parse(localStorage.getItem('currentOrder')); 
      thix.productList.splice(index,1)     
      thix.productList.push(new OrderProduct(product.code,product.name,cant,product.price));  
      console.log(JSON.stringify(thix.productList));  
      console.log("Added to Order")    
      localStorage.setItem("currentOrder",JSON.stringify(thix.productList));  
      this.productList=JSON.parse(localStorage.getItem('currentOrder'));  
      this.getOrderTotal();      
    }, function (dismiss) {
        if (dismiss === 'cancel') {
        console.log("Upss! Not added")
      }
    }) 
  }

  deleteOrderElement(product,index){
    this.productList.splice(index,1);
    this.productCount=this.productList.length;
    localStorage.setItem("currentOrder",JSON.stringify(this.productList));      
    this.getOrderTotal();    
  }

  confirm() {}
}
