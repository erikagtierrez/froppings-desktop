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
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { AngularFireDatabase } from "angularfire2/database";

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
    public database: AngularFireDatabase
  ) {
    const itemsList = database
      .list("users", ref => ref.orderByChild("id").equalTo("24637924"))
      .valueChanges();
    itemsList.subscribe(console.log);
  }

  ngOnInit() {}

  searchPoints() {
    const userPoints = this.database
      .list("users", ref =>
        ref.orderByChild("id").equalTo(this.idPoints.toString())
      )
      .valueChanges();
    userPoints.subscribe(result => {
      this.user = result;
      this.user.forEach(re => {
        console.log(re.points);
        this.avaliablePoints = re.points;
        this.gotPoints = true;
        this.found = true;
        this.pointProducts = this.database
          .list("products", ref =>
            ref.orderByChild("points").endAt(this.avaliablePoints.toString())
          )
          .valueChanges();
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
    }, 1500);
  }
}
