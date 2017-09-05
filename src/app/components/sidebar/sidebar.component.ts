import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Router, RouterModule } from "@angular/router";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(    
    private router: Router,
    public fireAuth: AngularFireAuth) { 

  }

  ngOnInit() {
  }

  logout(){
    this.fireAuth.auth.signOut();
    this.router.navigateByUrl("/login");
  }

}
