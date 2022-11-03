import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { AppointmentStatus } from 'src/app/models/appointment-status';
import { first } from 'rxjs';
import { IActionRequest} from 'src/app/models/iaction-requested';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css']
})
export class AppointmentCardComponent implements OnInit, OnChanges {

  @Input('appointment') appointment = new Appointment();
  @Input('userProfile') userProfile = new Profile();

  patientProfile: Profile = new Profile();
  specialistProfile: Profile = new Profile();

  cardClasses: Array<string> = [];

  dateManager: Date = new Date(Number(this.appointment.timestamp));

  @Output('actionRequest') actionEmitter = new EventEmitter<IActionRequest>();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void { 
    
    this.profileService.getProfileByUID(this.appointment.idPatient).pipe(first()).subscribe(
      (p: Profile[]) => {
        this.patientProfile = p[0];
      }
    )

    this.profileService.getProfileByUID(this.appointment.idSpecialist).pipe(first()).subscribe(
      (p: Profile[]) => {
        this.specialistProfile = p[0];
      }
    )

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.appointment.currentValue != changes.appointment.previousValue) {
      this.dateManager = new Date (Number(changes.appointment.currentValue.timestamp));
      this.appointment = changes.appointment.currentValue;
    }

    if (changes.userProfile.currentValue != changes.userProfile.previousValue) {
      this.userProfile = changes.userProfile.currentValue;
    }
    
  }

  setClassesByStatus(status: AppointmentStatus) {

    switch (status) {

      case 0:
        return 'alert-info';
        
      case 1:
        return 'alert-danger';

      case 2:
        return 'alert-danger';

      case 3:
        return 'alert-success';
      
      case 4: 
        return 'alert-success';

      case 5:
        return 'alert-danger';

      default: return '';

    }

  }

  onActionSelected(action: string) {
    this.actionEmitter.emit({
      action: action,
      appointment: this.appointment
    });
  }

}
