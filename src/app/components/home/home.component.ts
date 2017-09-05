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
  items: FirebaseListObservable<any[]>;
  
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/products');
  }

  ngOnInit() {
  }

}
