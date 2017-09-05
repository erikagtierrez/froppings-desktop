import { Router, RouterModule } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import swal from 'sweetalert2'
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";

@Component({
  selector: "app-points",
  templateUrl: "./points.component.html",
  styleUrls: ["./points.component.css"]
})
export class PointsComponent implements OnInit {
  pointProducts: FirebaseListObservable<any[]>;
  @Input() idPoints: number;
  avaliablePoints: number = 0;
  gotPoints: boolean = false;

  constructor(
    private router: Router,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {
    
  }

  ngOnInit() {}

  searchPoints() {
    console.log(this.idPoints);
    var userPoints = this.database
      .list("users", {
        query: {
          orderByChild: "id",
          equalTo: this.idPoints
        }
      })
      .subscribe(snapshots => {
        snapshots.forEach(snapshots => {
          this.avaliablePoints = snapshots.points;
          console.log(snapshots.id);
          this.gotPoints = true;
          this.pointProducts = this.database.list("products", {
            query: {
              orderByChild: "points",
              endAt: this.avaliablePoints
            }
          });
        });
      });
  }
}
