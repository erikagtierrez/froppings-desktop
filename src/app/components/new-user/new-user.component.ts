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
import * as moment from "moment";
import * as pdfMake from "pdfmake/build/pdfmake.js";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userName :any;
  userLastname:any;
  userId:any;
  userPoints:any;
  email:any;
  image: any = "https://firebasestorage.googleapis.com/v0/b/froppings-dafe4.appspot.com/o/productodefault.png?alt=media&token=b2b3f10c-56d1-47ea-be79-f8c7abed1dca";  
  password:any;
  selectedPermission:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                                                              
  ) { }

  ngOnInit() {
  }

  revertChanges(){
    this.router.navigateByUrl("/users");            
  }

  saveUser(){
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas crear usuario?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
      console.log(this.userName+","+this.selectedPermission);
      this.fireAuth.auth
      .createUserWithEmailAndPassword(
        this.email,
        this.password
      )
      .then(success => {
        console.log("UserCreated");
        this.afoDatabase.list("/users").push({
          name: this.userName,
          lastname:this.userLastname,
          id:this.userId,
          email:this.email,
          points:this.userPoints,
          image:this.image,
          type:this.selectedPermission
      }); 
      this.router.navigateByUrl("/users");
      })  
  });
  }
  
}
