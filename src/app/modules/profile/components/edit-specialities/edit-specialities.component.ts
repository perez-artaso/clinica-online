import { Component, OnInit } from '@angular/core';
import { Disponibility, IInputtedHourEvaluation } from 'src/app/models/disponibility';
import { SpecialistDisponibility } from 'src/app/models/specialist-disponibility';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SpecialistDisponibilityService } from 'src/app/services/specialist-disponibility.service';
import { Speciality } from '../../models/speciality';

@Component({
  selector: 'app-edit-specialities',
  templateUrl: './edit-specialities.component.html',
  styleUrls: ['./edit-specialities.component.css']
})
export class EditSpecialitiesComponent implements OnInit {

  disponibility: Array<Disponibility> = [];
  specialistDisponibility: SpecialistDisponibility = new SpecialistDisponibility();
  specialistProfile: SpecialistProfile = new SpecialistProfile();

  success: boolean = false;
  failure: boolean = false;

  newSpeciality: boolean = false;

  constructor(public disponibilityService: SpecialistDisponibilityService, private auth: AuthService, private profileService: ProfileService) { }

  ngOnInit(): void {

    this.specialistProfile = SpecialistProfile.FromLiteralObject(this.auth.GetCurrentUserProfile());

    this.disponibilityService.getDisponibilitiesByUID(this.auth.GetCurrentUserProfile().uid).subscribe(
      (d: any) => {

        this.specialistDisponibility = SpecialistDisponibility.FromLiteralObject(d[0]);
        this.disponibility = this.specialistDisponibility.disponibilities.map(x=>x);

      }
    );
  }

  addOrRemoveWorkingDay(disponibility: Disponibility, day: number) {

    if (disponibility.worksOn(day)) {

      disponibility.removeDay(day);

    } else {

      disponibility.addDay(day);

    }
    
  }

  // Agregar validación por horarios de clinica

  isValidHour(hour: string) {
    return Disponibility.validHour(hour).everythingOk;
  }

  assignNewValue(disponibility: Disponibility, field: string, day: number, value: any) {
      if( field == 'from' ) {
        disponibility.setFrom(day, value.target.value);
      } else if ( field == 'to' ) {
        disponibility.setTo( day, value.target.value );
      }
  }

  getInputtedHourEvaluationByDay(disponibility: Disponibility, day: number, field: string): IInputtedHourEvaluation {

    if (field == 'from') {
      return Disponibility.validHour(disponibility.getFromByDay(day));
    } else if (field == 'to') {
      return Disponibility.validHour(disponibility.getToByDay(day));
    }

    return {
      everythingOk: false,
      wrongFormat: false,
      hoursOutOfRange: false,
      minutesOutOfRange: false
    }
    
  }

  validHours(): boolean {

    for (let i = 0; i < this.disponibility.length; i++) {
      for (let j = 0; j < this.disponibility[i].dailyDisponibilities.length; j++) {
        
        if ( !Disponibility.validHour(this.disponibility[i].dailyDisponibilities[j].from) ) return false;
        if ( !Disponibility.validHour(this.disponibility[i].dailyDisponibilities[j].to) ) return false;

      }
    }

    return true;

  }

  receiveSpeciality(speciality: Speciality) {

    this.newSpeciality = false;

    this.disponibility.push(
      new Disponibility(speciality.name, [])
    );

  }

  removeSpeciality(specialityName: string) {

    for ( let i = 0; i < this.disponibility.length; i++ ) {

      if (this.disponibility[i].specialityName == specialityName) {
        this.disponibility = this.disponibility.slice(0, i).concat(this.disponibility.slice(i+1))
      }

    }
    
  }

  confirmDisponibility() {

    if (this.validHours()) {

      let specialities: Array<string> = [];

      this.disponibility.forEach(
        (disp: Disponibility) => {
          specialities.push(disp.specialityName);
        }
      );

      this.specialistProfile.specialities = specialities;

      this.profileService.updateDocument(this.specialistProfile.id, this.specialistProfile.getLiteralObjectRepresentation());

      this.specialistDisponibility.disponibilities = this.disponibility;
      this.disponibilityService.updateDocument(this.specialistDisponibility.id, this.specialistDisponibility.getLiteralObjectRepresentation()).then(
        () => {
          this.success = true;
          setTimeout(()=>this.success = false, 2000)
        }
      ).catch(
        (err) => console.dir(err)
      );

    }


  }

}
