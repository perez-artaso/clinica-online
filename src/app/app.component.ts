import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { fader} from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader    
  ]
})
export class AppComponent {

  constructor (private contexts: ChildrenOutletContexts) {}

  prepareRoute(outlet: RouterOutlet) {
    if(outlet.isActivated) {
      return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
    else return undefined;
  }

}
