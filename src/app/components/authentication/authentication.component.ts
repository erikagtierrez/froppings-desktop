import { Router } from '@angular/router';
import { UsersService } from './../../shared/users.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [UsersService]
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.userService.login(form.value.email,form.value.password).subscribe(
      data => {
       if (data.token) {
          let authUser = {
            "email": form.value.email,
            "password": form.value.password
        	}
        	this.router.navigateByUrl("/dashboard");
      }else{
        console.log("Error on sign up " + data.code);
      }});
  }

}
