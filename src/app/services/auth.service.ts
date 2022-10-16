import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: firebase.default.User | null = null;
  private notifier$: Subject<firebase.default.User | null> = new Subject();

  constructor(private auth: AngularFireAuth) {
    
  }

  Login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  SetCurrentUser(user: firebase.default.User): void {
    this.currentUser = user;
    this.Notify();
  }

  GetCurrentUserEmail() {
    return this.currentUser?.email;
  }

  GetCurrentUserPhotoUrl() {
    return this.currentUser?.photoURL;
  }

  GetCurrentUserDisplayName() {
    return this.currentUser?.displayName;
  }

  GetCurrentUserID() {
    return this.currentUser?.uid;
  }

  IsUserLoggedIn(): boolean {
    return this.currentUser != null;
  }

  LogOut() {
    this.currentUser = null;
    this.Notify();
  }

  private Notify() {
    this.notifier$.next(this.currentUser);
  }

  public UserActivity (): Subject<firebase.default.User | null>{
    return this.notifier$;
  }

}