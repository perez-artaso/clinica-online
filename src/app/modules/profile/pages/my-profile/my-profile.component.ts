import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ProfileImages } from 'src/app/models/profile-images';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  currentProfile = new SpecialistProfile();

  profileImages: ProfileImages = new ProfileImages();

  constructor(public profiles: ProfileService, public auth: AuthService, public profileImagesService: ProfileImagesService) { }

  ngOnInit(): void {

    this.currentProfile = this.auth.GetCurrentUserProfile() as SpecialistProfile;

    this.profileImagesService.getImagesByUID(this.currentProfile.uid).subscribe(
      (pi: ProfileImages[]) => {
        this.profileImages = pi[0];
      }
    );
    
  }



}
