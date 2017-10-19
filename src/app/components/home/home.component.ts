import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
} from "angularfire2/database";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any;
  
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/products').valueChanges();
  }

  ngOnInit() {
  }

}
