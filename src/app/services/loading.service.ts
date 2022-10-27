import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  notifier$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  loadingStart() {
    this.notifier$.next(true);
  }

  loadingEnd() {
    this.notifier$.next(false);
  }

  loadingNotifier() {
    return this.notifier$;
  }

}
