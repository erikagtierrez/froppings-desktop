import {
  Router,
  RouterModule,
  ActivatedRoute,
  ParamMap
} from "@angular/router";
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

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  iva: any;
  pointsToMoney:any;
  address:any;
  config:any; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase,
    public afoDatabase: AngularFireOfflineDatabase                                          
  ) { }

  ngOnInit() {
    this.afoDatabase
    .list("config/")
    .subscribe(snapshots => {
      var value: any;
      value = snapshots;
      value.forEach(action => {
        console.log(action.pointsToMoney);
        this.address=action.address;
        this.pointsToMoney = action.pointsToMoney;
        this.iva = action.iva;
      });
    });
  }

  modifyConfig(){
    swal({
      title: "Hey!",
      text: "¿Estas seguro que deseas guardar la configuración?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
      cancelButtonText: "No, volver"
    }).then(_ => {
    this.afoDatabase
    .list("config/").update("1",{
      address:this.address,
      pointsToMoney:this.pointsToMoney,
      iva: this.iva
    });
    swal(
      'Guardado!',
      'success'
    )
   });
  }

}
