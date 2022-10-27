import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newSpecialist: boolean = false;
  newPatient: boolean = true;
  newAdmin: boolean = false;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  exit() {
    this.router.navigate(['/home']);
  }

}
