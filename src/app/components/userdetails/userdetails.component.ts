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
import * as pdfFonts from "pdfmake/build/vfs_fonts.js";

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  id:any;
  userName :any;
  userLastname:any;
  userId:any;
  userPoints:any;
  email:any;
  selectedPermission:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase    
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];    
    this.afoDatabase
    .object("users/"+this.id)
    .subscribe(snapshots => {
      var items:any=snapshots;
        console.log(items)
        this.userName=items.name;
        this.userLastname=items.lastname;
        this.userId=items.id;
        this.email=items.email;
        this.userPoints=items.points;
    });
  }

  revertChanges(){
    this.router.navigateByUrl("/users");            
  }

  saveUser(){
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas guardar información de usuario?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
      this.afoDatabase.list("/users").update(this.id,{
        name: this.userName,
        lastname:this.userLastname,
        id:this.userId,
        email:this.email,
        points:this.userPoints,
        type:this.selectedPermission
    }); 
    this.router.navigateByUrl("/users");  
  });
  }  
}
