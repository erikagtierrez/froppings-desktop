import { Router, RouterModule } from "@angular/router";
import { UsersService } from "./../../shared/users.service";
import { FormsModule } from "@angular/forms";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { NgModel } from "@angular/forms";
import * as firebase from "firebase/app";
import swal from 'sweetalert2'
import { AngularFirestore } from 'angularfire2/firestore';
import {
  AngularFireDatabase
} from "angularfire2/database";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"],
  providers: [UsersService]
})
export class AuthenticationComponent implements OnInit {
  isRegistration: boolean;
  useProvider: boolean;
  user: Observable<firebase.User>;
  newUser: any;
  @Input() emailRegister: string = "";
  @Input() nameRegister: string = "";
  @Input() lastnameRegister: string = "";
  @Input() idRegister: number = null;

  constructor(
    private router: Router,
    private userService: UsersService,
    public fireAuth: AngularFireAuth,
    public database: AngularFireDatabase
  ) {
    this.user = fireAuth.authState;
    this.isRegistration = false;
    this.useProvider = false;
    this.fireAuth.authState.subscribe(auth => {
      if (auth) {
        console.log("AUTH: " + auth);
        this.router.navigateByUrl("/dashboard");
      }
    });
  }

  ngOnInit() {}

  fbLogin() {
    var exist = false;
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(success => {
        var newUser = this.database
          .list("users", ref=> ref.child("email").equalTo(this.fireAuth.auth.currentUser.email))
          .valueChanges()
          .subscribe(snapshots => {
            snapshots.forEach((snapshots,id) => {
              if (snapshots[id].email == this.fireAuth.auth.currentUser.email) {
                this.router.navigateByUrl("/dashboard");
                exist = true;
              }
            });
            if (!exist) {
              swal({
                title: 'Algo anda mal!',
                text: 'El usuario ingresado no existe',
                type: 'error',
                confirmButtonText: 'Ok!'
              });
              //Alert  "Not registered"
            }
          });
      })
      .catch(err => {
        swal({
          title: 'Algo anda mal!',
          text: 'No se pudo realizar la autenticacion de Facebook',
          type: 'error',
          confirmButtonText: 'Ok!'
        });
      });
  }

  fbRegister() {
    var exist = false;
    this.useProvider = true;
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(result => {
        console.log(this.fireAuth.auth.currentUser);
        var newUser = this.database
        .list("users", ref=> ref.child("email").equalTo(this.fireAuth.auth.currentUser.email))
        .valueChanges()
        .subscribe(snapshots => {
          snapshots.forEach((snapshots,id) => {
            if (snapshots[id].email == this.fireAuth.auth.currentUser.email) {
              this.router.navigateByUrl("/dashboard");
              exist = true;
            }
          });
      })})
      .catch(function(error) {
        console.log(error);
        swal({
          title: 'Algo anda mal!',
          text: 'No se pudo realizar la autenticacion de Facebook',
          type: 'error',
          confirmButtonText: 'Ok!'
        });
      });
    if (!exist) {
      let authDisplayName = this.fireAuth.auth.currentUser.displayName.split(
        " "
      );
      this.nameRegister = authDisplayName[0];
      this.lastnameRegister = authDisplayName[1];
      this.emailRegister = this.fireAuth.auth.currentUser.email;
    }
  }

  googleLogin() {
    var exist = false;
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(success => {
        var newUser = this.database
        .list("users", ref=> ref.child("email").equalTo(this.fireAuth.auth.currentUser.email))
        .valueChanges()
        .subscribe(snapshots => {
          snapshots.forEach((snapshots,id) => {
            if (snapshots[id].email == this.fireAuth.auth.currentUser.email) {
              this.router.navigateByUrl("/dashboard");
              exist = true;
            }
          });
            if (!exist) {
              swal({
                title: 'Algo anda mal!',
                text: 'El usuario ingresado no existe',
                type: 'error',
                confirmButtonText: 'Ok!'
              });
            }
          });
      })
      .catch(err => {
        swal({
          title: 'Algo anda mal!',
          text: 'No se pudo realizar la autenticacion de Google',
          type: 'error',
          confirmButtonText: 'Ok!'
        });
      });
  }

  googleRegister(form: NgForm) {
    var exist = false;
    this.useProvider = true;
    this.fireAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        console.log(this.fireAuth.auth.currentUser);
        var newUser = this.database
        .list("users", ref=> ref.child("email").equalTo(this.fireAuth.auth.currentUser.email))
        .valueChanges()
        .subscribe(snapshots => {
          snapshots.forEach((snapshots,id) => {
            if (snapshots[id].email == this.fireAuth.auth.currentUser.email) {
              this.router.navigateByUrl("/dashboard");
              exist = true;
            }
          });
      })})
      .catch(function(error) {
        swal({
          title: 'Algo anda mal!',
          text: 'No se pudo realizar la autenticacion de Google',
          type: 'error',
          confirmButtonText: 'Ok!'
        });
        console.log(error);
      });
    if (!exist) {
      let authDisplayName = this.fireAuth.auth.currentUser.displayName.split(
        " "
      );
      this.nameRegister = authDisplayName[0];
      this.lastnameRegister = authDisplayName[1];
      this.emailRegister = this.fireAuth.auth.currentUser.email;
    }
  }

  onRegister(form: NgForm) {
    if (form.valid) {
      var providerLogged = this.fireAuth.auth.currentUser;
      if (!this.useProvider) {
        this.fireAuth.auth
          .createUserWithEmailAndPassword(
            form.value.emailRegister,
            form.value.passwordRegister
          )
          .then(success => {
            console.log("UserCreated");
            this.router.navigateByUrl("/dashboard");
          })
          .catch(err => {
            swal({
              title: 'Algo anda mal!',
              text: 'Hubo un error al crear tu cuenta de Froppings',
              type: 'error',
              confirmButtonText: 'Ok!'
            });
          });
      }
      var authUserInfo = {
        email: form.value.emailRegister,
        id: form.value.idRegister,
        password: "",
        lastname: form.value.lastnameRegister,
        name: form.value.nameRegister,
        points: 0,
        type: "client"
      };
      console.log(JSON.stringify(authUserInfo));
      this.database
        .list("/users/")
        .push(authUserInfo)
        .then(success => {
          this.router.navigateByUrl("/dashboard");
        },err => {
          swal({
            title: 'Algo anda mal!',
            text: 'Intentalo de nuevo',
            type: 'error',
            confirmButtonText: 'Ok!'
          });
          console.log(err);
        });
    }
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log(loginForm.value);
      this.fireAuth.auth
        .signInWithEmailAndPassword(
          loginForm.value.email,
          loginForm.value.password
        )
        .then(success => {
          console.log(success);
          this.router.navigateByUrl("/dashboard");
        })
        .catch(error => {
          if(error.message=='There is no user record corresponding to this identifier. The user may have been deleted.'){
          swal({
            title: 'Algo anda mal!',
            text: 'El email ingresado es incorrecto',
            type: 'error',
            confirmButtonText: 'Ok!'
          });
        }else if(error.message=='The password is invalid or the user does not have a password.'){
          swal({
            title: 'Algo anda mal!',
            text: 'La contraseña ingresada es incorrecta o el usuario no posee contraseña!',
            type: 'error',
            confirmButtonText: 'Ok!'
          });
        }
          console.log("Error:"+error);
        });
    }
  }


  forgotPassword(){
    swal({
      title: 'Ingresa el email registrado a tu cuenta',
      input: 'email'
    }).then((email) =>{
      this.fireAuth.auth.sendPasswordResetEmail(email).then(function() {
        swal(
          'Recupera tu cuenta!',
          'Te hemos enviado un correo para restablecer tu contraseña!',
          'success'
        )
      }, function(error) {
        swal({
          title: 'Algo anda mal!',
          text: 'Correo no encontrado',
          type: 'error',
          confirmButtonText: 'Ok!'
        });
      });
    })
    
  }
}
