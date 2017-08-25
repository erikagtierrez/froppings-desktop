import { Router, RouterModule } from '@angular/router';
import { UsersService } from './../../shared/users.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [UsersService]
})
export class AuthenticationComponent implements OnInit {
  user: Observable<firebase.User>;
  
  constructor(private router: Router, private userService: UsersService, public fireAuth: AngularFireAuth) {
    this.user=fireAuth.authState;
   }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        (success)=> {
           this.router.navigateByUrl('./dashboard');      
         }, (err)=> {
          // login error
        })
      }
  }

