import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public user: firebase.default.User | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.auth.UserActivity().subscribe(

      (user: firebase.default.User | null) => {
        this.user = user;
        if (user) {
        } else {
        }
      }

    );

  }

  LogOut() {
    this.auth.LogOut();
    this.router.navigate(["/login"]);
  }

}
