import { Router, RouterModule } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
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

export class User {
  constructor(
    private email: string,
    private id: string,
    private lastname: string,
    private name: string,
    private points: number,
    private type: string
  ) {}
}

@Component({
  selector: "app-points",
  templateUrl: "./points.component.html",
  styleUrls: ["./points.component.css"]
})
export class PointsComponent implements OnInit {
  pointProducts: any;
  @Input() idPoints: number;
  avaliablePoints: number = 0;
  gotPoints: boolean = false;
  user: any;
  found: boolean = false;

  constructor(
    private router: Router,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase
  ) {
    
  }

  ngOnInit() {}

  searchPoints() {
    console.log(this.idPoints);    
    const userPoints = this.afoDatabase
      .list("/users",{query:{
        orderByChild:"id",
        equalTo: this.idPoints
      }});
    userPoints.subscribe(result => {
      this.user = result;
      console.log(this.user);      
      this.user.forEach(re => {
        console.log(re.points);
        this.avaliablePoints = re.points;
        this.gotPoints = true;
        this.found = true;
        this.pointProducts = this.database
          .list("products", { 
            query: { 
              orderByChild: "points", 
              startAt:0,
              endAt: this.avaliablePoints 
            } 
          }); 
      });
    });
    setTimeout(re => {
      if (!this.found) {
        this.idPoints=null;
        this.pointProducts=null;
        this.gotPoints = false;        
        this.avaliablePoints=0;
        swal({
          title: "Algo anda mal!",
          text: "No se encontro usuario con la identificacion ingresada",
          type: "error",
          confirmButtonText: "Ok!"
        });
      } else {
        this.found = false;
      }
    }, 2200);
  }
}
