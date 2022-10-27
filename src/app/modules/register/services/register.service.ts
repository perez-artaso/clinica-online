import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  NewUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  VerifyUser() {
    return this.auth.currentUser.then(
      (user) => {
        return user?.sendEmailVerification().then(
          () => this.router.navigate(['welcome'])
        )
      } 
    )
  }

  async GetNewUserID() {
    let user = await this.auth.currentUser;
    return user?.uid;
  }

}
