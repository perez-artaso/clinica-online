import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginErrors } from 'src/app/models/login-errors';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  _email: string = "";
  _password: string = "";

  errors: LoginErrors = new LoginErrors();

  @Output('registerRequest') registerEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.IsUserLoggedIn()) this.router.navigate(['/home']);
  }

  login() {
    this.auth.Login(this._email, this._password).then(
      (res) => {

        if ( res.user != null ) {
          if (res.user.emailVerified) {
            this.auth.SetCurrentUser(res.user);
            this.router.navigate(["/home"]);
          } else {
            this.errors.EMAIL_NOT_VERIFIED.ocurred = true;
          }
        }

      }
    ).catch(

      (err) => {

        this.errors.ClearErrors();

        if ( this.RequiredFieldsFilled() ) {
          
          if (err.code == "auth/invalid-email") {

            this.errors.INVALID_EMAIL.ocurred = true;
  
          } else if (err.code == "auth/wrong-password") {
  
            this.errors.WRONG_PASSWORD.ocurred = true;
  
          }else if (err.code == "auth/user-not-found") {
  
            this.errors.USER_NOT_FOUND.ocurred = true;
  
          } else {
  
            this.errors.OTHER.message = err.message;
            this.errors.OTHER.ocurred = true;            
  
          }
        }
        
      }
      
    );
  }

  RequiredFieldsFilled(): boolean {

    if (this._email == "") {
      this.errors.EMAIL_REQUIRED.ocurred = true;
      return false;
    } else if (this._password == "") {
      this.errors.PASSWORD_REQUIRED.ocurred = true;
      return false;
    }

    return true;

  }

  registerRequest() {
    this.registerEmitter.emit();
  }


}
