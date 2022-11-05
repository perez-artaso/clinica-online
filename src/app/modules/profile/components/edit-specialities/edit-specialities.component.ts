import { Component, OnInit } from '@angular/core';
import { Disponibility, IInputtedHourEvaluation } from 'src/app/models/disponibility';
import { SpecialistDisponibility } from 'src/app/models/specialist-disponibility';
import { AuthService } from 'src/app/services/auth.service';
import { SpecialistDisponibilityService } from 'src/app/services/specialist-disponibility.service';

@Component({
  selector: 'app-edit-specialities',
  templateUrl: './edit-specialities.component.html',
  styleUrls: ['./edit-specialities.component.css']
})
export class EditSpecialitiesComponent implements OnInit {

  disponibility: Array<Disponibility> = [];
  specialistDisponibility: SpecialistDisponibility = new SpecialistDisponibility();

  success: boolean = false;
  failure: boolean = false;

  constructor(public disponibilityService: SpecialistDisponibilityService, private auth: AuthService) { }

  ngOnInit(): void {
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

  confirmDisponibility() {

    if (this.validHours()) {

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
