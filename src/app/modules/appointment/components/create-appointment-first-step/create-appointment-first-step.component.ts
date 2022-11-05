import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { first } from 'rxjs';
import { ProfileImages } from 'src/app/models/profile-images';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { Speciality } from 'src/app/modules/register/models/speciality';
import { SpecialityService } from 'src/app/modules/register/services/speciality.service';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';
import { ISpecialityAndSpecialist } from '../../models/speciality-and-specialist';

@Component({
  selector: 'app-create-appointment-first-step',
  templateUrl: './create-appointment-first-step.component.html',
  styleUrls: ['./create-appointment-first-step.component.css']
})
export class CreateAppointmentFirstStepComponent implements OnInit {

  showSpecialists: boolean = true;
  showSpecialities: boolean = false;

  specialists: Array<SpecialistProfile> = [];
  specialities: Array<string> = [];

  selectedSpecialist: SpecialistProfile = new SpecialistProfile();
  selectedSpeciality: string = "";

  showSpecialistsBySpeciality: boolean = false;
  showSpecialitiesBySpecialist: boolean = false;

  specialitiesBySpecialist: Array<string> = [];
  specialistsBySpecialities: Array<SpecialistProfile> = [];
  
  @Output('specialityAndSpecialist') specialistEmitter = new EventEmitter<ISpecialityAndSpecialist>();

  systemSpecialities: Speciality[] = [];
  specialistsImages: ProfileImages[] = [];

  constructor(private profiles: ProfileService, private specialityService: SpecialityService, private profileImages: ProfileImagesService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.profiles.getSpecialistsProfiles().subscribe(

      (p: Array<SpecialistProfile>) => {
        this.specialists = p;
        this.specialities = this.getSpecialityList();
        this.getSpecialistsImages();
      }

    );

    this.specialityService.getDocuments().pipe(first()).subscribe(
      (s) => this.systemSpecialities = s
    )

  }

  getSpecialistsImages() {
    this.specialists.forEach(
      (specialist: SpecialistProfile) => {

        this.profileImages.getImagesByUID(specialist.uid).pipe(first()).subscribe(
          (imgs: ProfileImages[]) => {
            if (imgs.length > 0) {
              this.specialistsImages.push(imgs[0]);
            }            
          }
        )

      }
    );
  }

  getSpecialistProfileImage(uid: string): SafeResourceUrl {

    for (let i = 0; i < this.specialistsImages.length; i++) {
      if (this.specialistsImages[i].uid == uid) {
        return this.getSanitizedSrc(this.specialistsImages[i].images[0]);
      }
    }

    return this.getSanitizedSrc(environment.templateImg);

  }

  getSanitizedSrc(src: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' + src );
  }

  getSpecialityList(): Array<string> {
    
    let specialityList: Array<string> = [];

    this.specialists.forEach(
      (specialist: SpecialistProfile) => {
        
        specialist.specialities.forEach(
          (speciality: string) => {
            if (!this.isSpecialityAlreadyInList(specialityList, speciality)) specialityList.push(speciality)
          }
        );

      }
    );

    return specialityList;

  }

  isSpecialityAlreadyInList(specialities: string[], speciality: string): boolean {
    
    for(let i = 0; i < specialities.length; i++) {
      if (specialities[i].toLowerCase() == speciality.toLowerCase()) return true;
    }

    return false;

  }

  setSpecialitiesBySpecialist(specialist: SpecialistProfile): void {
    this.specialitiesBySpecialist = specialist.specialities;
  }

  setSpecialistBySpecialities(speciality: string): void {

    let matchedSpecialists: Array<SpecialistProfile> = [];

    for (let i = 0; i < this.specialists.length; i++) {
      if (this.specialists[i].specialities.indexOf(speciality) != -1) matchedSpecialists.push(this.specialists[i])
    }

    this.specialistsBySpecialities = matchedSpecialists;

  }

  onSelectedSpecialist(specialist: SpecialistProfile) {

    this.setSelectedSpecialist(specialist);
    this.setSpecialitiesBySpecialist(specialist);
    
    if (this.specialitiesBySpecialist.length > 1) {

      this.revealSpecialitiesBySpecialist();

    } else {

      this.selectedSpeciality = this.specialitiesBySpecialist[0];
      this.emmitSpecialityAndSpecialist();

    }

  }

  onSelectedSpeciality(speciality: string) {

    this.setSelectedSpeciality(speciality);
    this.setSpecialistBySpecialities(speciality);

    this.revealSpecialistsBySpeciality();

  }

  setSelectedSpecialist(specialist: SpecialistProfile) {
    this.selectedSpecialist = specialist;
  }

  setSelectedSpeciality(speciality: string) {
    this.selectedSpeciality = speciality;
  }

  selectSpecialityAndSubmit(speciality: string) {
    this.setSelectedSpeciality(speciality);
    this.emmitSpecialityAndSpecialist();
  } 

  selectSpecialistAndSubmit(specialist: SpecialistProfile) {
    this.setSelectedSpecialist(specialist);
    this.emmitSpecialityAndSpecialist();
  } 

  emmitSpecialityAndSpecialist () {

    const specialistAndSpeciality: ISpecialityAndSpecialist = {
      specialist: this.selectedSpecialist,
      speciality: this.selectedSpeciality
    }

    this.specialistEmitter.emit(specialistAndSpeciality);
    this.hideAll();

  }

  revealSpecialists() {
    this.showSpecialists = true;
    this.showSpecialities = false;
    this.showSpecialistsBySpeciality = false;
    this.showSpecialitiesBySpecialist = false;
  }

  revealSpecialities() {
    this.showSpecialists = false;
    this.showSpecialities = true;
    this.showSpecialistsBySpeciality = false;
    this.showSpecialitiesBySpecialist = false;
  }

  revealSpecialistsBySpeciality() {
    this.showSpecialists = false;
    this.showSpecialities = false;
    this.showSpecialistsBySpeciality = true;
    this.showSpecialitiesBySpecialist = false;
  }

  revealSpecialitiesBySpecialist() {
    this.showSpecialists = false;
    this.showSpecialities = false;
    this.showSpecialistsBySpeciality = false;
    this.showSpecialitiesBySpecialist = true;
  }

  hideAll() {
    this.showSpecialists = false;
    this.showSpecialities = false;
    this.showSpecialistsBySpeciality = false;
    this.showSpecialitiesBySpecialist = false;
  }

  getSpecialityImageURL(specialityName: string): string {

    let url = 'assets/speciality-images/';
    let found = false;

    for (let i = 0; i < this.systemSpecialities.length; i++) {

      if (this.systemSpecialities[i].name == specialityName) {
        url += this.systemSpecialities[i].image + '.png';
        found = true;
        break;
      }

    }

    return (found ? url : url + 'default.png')

  }

}