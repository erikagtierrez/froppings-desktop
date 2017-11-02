import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Router, RouterModule } from "@angular/router";
import {
  FirebaseListObservable,
  AngularFireDatabase
} from "angularfire2/database";
import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase
} from "angularfire2-offline/database";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  type: any = "Cajero";
  constructor(
    private router: Router,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase
  ) {}

  ngOnInit() {
    this.afoDatabase
      .list("/users", {
        query: {
          orderByChild: "email",
          equalTo: this.fireAuth.auth.currentUser.email
        }
      })
      .subscribe(element => {
        element.forEach(element => {
          localStorage.setItem("type", element.type);
          console.log(element.type);
          this.type = localStorage.getItem("type");
          this.router.navigateByUrl("/dashboard");
        });
      });
    console.log(this.type);
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.router.navigateByUrl("/login");
  }
}
