import { Component, OnInit } from '@angular/core';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-specialist-management',
  templateUrl: './specialist-management.component.html',
  styleUrls: ['./specialist-management.component.css']
})
export class SpecialistManagementComponent implements OnInit {

  approved_specialists: SpecialistProfile[] = [];
  not_approved_specialists: SpecialistProfile[] = [];
  
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

    this.profileService.getSpecialistsProfiles().subscribe(

      (res: any) => {
  
        if (res) {
          this.approved_specialists = res.filter( (s: any) => s.approved == 1 );
          this.not_approved_specialists = res.filter( (s: any) => s.approved == 0 );
        }

      }

    );

  }

  approve_specialist(specialist: SpecialistProfile) {
    specialist.approved = 1;
    this.profileService.updateDocument(specialist.id, specialist);
  }

  block_specialist(specialist: SpecialistProfile) {
    specialist.approved = 0;
    this.profileService.updateDocument(specialist.id, specialist);
  }


}
