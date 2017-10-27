import { Component } from '@angular/core';
import { 
  FirebaseListObservable, 
  AngularFireDatabase 
} from "angularfire2/database"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(db: AngularFireDatabase){
    
  }
}
