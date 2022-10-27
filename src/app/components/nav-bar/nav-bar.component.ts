import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public user: firebase.default.User | null = null;
  public display: boolean = false;
  public profile: Profile = {} as Profile;

  constructor(private auth: AuthService, private router: Router, private navBarService: NavbarService, private profileService: ProfileService) { }

  ngOnInit(): void {

    this.auth.UserActivity().subscribe(

      (user: firebase.default.User | null) => {

        this.user = user;

        if (user) {
          this.profileService.getProfileByUID(user.uid).subscribe(
            (res: any) => this.profile = res[0]
          );
        }

      }

    );

    this.navBarService.navBarNotifier().subscribe(
      show => this.display = show
    );

  }

  LogOut() {
    this.auth.LogOut();
    this.navBarService.hideNavbar();
    this.router.navigate(["/welcome"]);
  }

}
