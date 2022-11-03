import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ISpecialityAndSpecialist } from '../../models/speciality-and-specialist';

@Component({
  selector: 'app-create-appointment-first-step',
  templateUrl: './create-appointment-first-step.component.html',
  styleUrls: ['./create-appointment-first-step.component.css']
})
export class CreateAppointmentFirstStepComponent implements OnInit {

  showSpecialists: boolean = false;
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

  constructor(private profiles: ProfileService) { }

  ngOnInit(): void {
    this.profiles.getSpecialistsProfiles().subscribe(

      (p: Array<SpecialistProfile>) => {
        this.specialists = p;
        this.specialities = this.getSpecialityList();
      }

    );
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

}