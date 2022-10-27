import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  showRegisterForm: boolean = false;

  constructor(private router: Router) { 
   
  }

  ngOnInit(): void {
  }

  registerRequested() {
    this.showRegisterForm = true;
  }

  exitRegisterForm() {
    this.showRegisterForm = false;
  }

}
