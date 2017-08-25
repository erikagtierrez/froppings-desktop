import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from "angularfire2/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos = ["Producto 1","Producto 2","Producto 3","Producto 4","Producto 5","Producto 6","Producto 1","Producto 2","Producto 3","Producto 4","Producto 5","Producto 6"];
  items: FirebaseListObservable<any[]>;
  
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/products');
  }

  ngOnInit() {
  }

}
