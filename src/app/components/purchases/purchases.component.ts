import { Router, RouterModule, ActivatedRoute } from "@angular/router";
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
@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.css"]
})
export class PurchasesComponent implements OnInit {
  purchases: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                          
  ) {
    this.purchases = afoDatabase
      .list("/purchases");
  }

  ngOnInit() {}
}
