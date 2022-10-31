import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Profile } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  
  date = new Date(2022, 9, 31, 15, 30, 0);

  someAppointment = new Appointment (

    this.date.getTime().toString(),
    30,
    "kjy1e3PaPzOOtYiFlLnqGL375np1",
    "ntUdqBo94oQlEkZ33k24Rrlb4C03",
    "Odontología",
    3.5,
    "",
    "",
    0

  );

  userProfile: Profile = new Profile();

  constructor(private nabvar: NavbarService, private auth: AuthService, private profileService: ProfileService) {}

  ngOnInit(): void {
    
    this.nabvar.showNavbar();
    
    let userId = this.auth.GetCurrentUserID();

    if (userId) {

      this.profileService.getProfileByUID(userId).pipe(first()).suscribe(
        (p: Array<Profile>) => {
          this.userProfile = p[0];
        }
      );

    }


  }

}
