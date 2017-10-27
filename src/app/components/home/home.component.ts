import { Component, OnInit } from '@angular/core';
import { 
  FirebaseListObservable, 
  AngularFireDatabase 
} from "angularfire2/database"; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any;
  
  constructor(db: AngularFireDatabase) {
    this.items = db.list('/products');
  }

  ngOnInit() {
  }

}
