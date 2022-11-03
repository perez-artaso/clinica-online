import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { DailyDisponibility } from 'src/app/models/daily-disponibility';
import { Disponibility } from 'src/app/models/disponibility';
import { MmsState } from 'src/app/models/mms-state';
import { Profile } from 'src/app/models/profile';
import { SpecialistDisponibility } from 'src/app/models/specialist-disponibility';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SpecialistDisponibilityService } from 'src/app/services/specialist-disponibility.service';
import { ISpecialityAndSpecialist } from '../../models/speciality-and-specialist';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  mms: MmsState = new MmsState(0, 90);

  currentProfile: Profile = new Profile();

  patientProfiles: Profile[] = [];

  newAppointment: Appointment = new Appointment();
  dateManager: Date = new Date();

  specialistAppointments: Array<Appointment> = [];
  specialistDailyDisponibilities: Array<DailyDisponibility> = [];

  specialistFullName: string = "";

  constructor(private appointments: AppointmentService, private disponibilities: SpecialistDisponibilityService, private auth: AuthService, public profileService: ProfileService) { }

  ngOnInit(): void {

    this.currentProfile = this.auth.GetCurrentUserProfile();

    if (this.currentProfile.role == 0) {

      this.move();

      let currentUserId = this.auth.GetCurrentUserID();

      if (currentUserId) {
        this.newAppointment.idPatient = currentUserId;
      }

    } else if (this.currentProfile.role == 2) {

      this.profileService.getPatientProfiles().pipe(first()).subscribe(
        (p: Profile[]) => this.patientProfiles = p
      );

    }

  }

  receiveSpecialityAndSpecialist(specialityAndSpecialist: ISpecialityAndSpecialist) {
    this.newAppointment.idSpecialist = specialityAndSpecialist.specialist.uid;
    this.newAppointment.speciality = specialityAndSpecialist.speciality;

    this.specialistFullName = specialityAndSpecialist.specialist.name + " " + specialityAndSpecialist.specialist.last_name;

    this.appointments.getAppointmentsBySpecialistId(this.newAppointment.idSpecialist).pipe(first()).subscribe(
      (a: Appointment[]) => this.specialistAppointments = a
    );
    
    this.disponibilities.getDisponibilitiesByUID(this.newAppointment.idSpecialist).subscribe(
      (d: SpecialistDisponibility[]) => {

        const dspnblts = (new SpecialistDisponibility(d[0].specialistId, d[0].disponibilities)).getDisponibilities();

        for(let i = 0; i < dspnblts.length; i++) {

          let dspnblt = (new Disponibility(dspnblts[i].specialityName, dspnblts[i].dailyDisponibilities));

          if ( dspnblt.getSpecialityName().toLowerCase() == this.newAppointment.speciality.toLowerCase() ) {
            this.specialistDailyDisponibilities = dspnblt.getDailyDisponibilities();
            this.move();
          }

        }

      }
    );

  }

  receiveSelectedDate (date: Date) {

    this.newAppointment.timestamp = date.getTime().toString();
    this.newAppointment.duration = 30;
    this.move();
    
  }

  move(times: number = 1, mode: string = "f"): void {

    if (mode == 'b') {

      for(let i = 0; i < times; i++) {
        this.moveLeft();
      }

    } else {

      for(let i = 0; i < times; i++) {
        this.moveRight();
      }

    }

  }

  moveRight(): void {
    this.mms = new MmsState(this.mms.elementOnScreen + 1, 90);
  }

  moveLeft(): void {
    this.mms = new MmsState(this.mms.elementOnScreen - 1, 90);
  }

  receiveCancelation() {
    if (this.currentProfile.role == 0) {
      this.move(2, 'b');
    } else this.move(3, 'b');
  }

}
