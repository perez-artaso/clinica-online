import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  notifier$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  showNavbar() {
    this.notifier$.next(true);
  }

  hideNavbar() {
    this.notifier$.next(false);
  }

  navBarNotifier() {
    return this.notifier$;
  }

}
