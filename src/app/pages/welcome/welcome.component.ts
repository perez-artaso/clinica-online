import { Component, OnInit } from '@angular/core';
import { Router, Event as NavigationEvent , NavigationStart, NavigationEnd } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  showRegisterForm: boolean = false;

  specialistForm: boolean = false;
  patientForm: boolean = true;

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.initLoadingIndicator();
  }

  registerRequested() {
    this.showRegisterForm = true;
  }

  exitRegisterForm() {
    this.showRegisterForm = false;
  }

  initLoadingIndicator() {

    this.router.events.subscribe(

      (event: NavigationEvent) => {

        if(event instanceof NavigationStart) {
          this.loadingService.loadingStart();
        } else if (event instanceof NavigationEnd) {
          this.loadingService.loadingEnd();
        }

      }
      
    );

  }

}
