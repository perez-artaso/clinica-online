import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Profile } from 'src/app/models/profile';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { DateService } from 'src/app/services/date.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-list-crs',
  templateUrl: './list-crs.component.html',
  styleUrls: ['./list-crs.component.css']
})
export class ListCrsComponent implements OnInit {

  myPatients: Profile[] = [];
  myAppointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService, private profileService: ProfileService, private auth: AuthService, private router: Router, public dateService: DateService) { }

  ngOnInit(): void {
    const specialistId = this.auth.GetCurrentUserID()

    if (this.auth.GetCurrentUserProfile().role == 1) {

      if (specialistId) {
        this.appointmentService.getAppointmentsBySpecialistId(specialistId).subscribe(
          (appointments: Appointment[]) => {
            let patientsIds: string[] = [];

            this.myAppointments = appointments;
            this.myAppointments.sort( (a, b) =>  Number(b.timestamp) - Number(a.timestamp) );
            
            appointments.forEach(
              (appointment) => {
                if (appointment.status == 4 && !patientsIds.includes(appointment.idPatient)) {
                  patientsIds.push(appointment.idPatient);
                }
              }
            );
  
            patientsIds.forEach(
              (patientId: string) => {
                this.profileService.getProfileByUID(patientId).pipe(first()).subscribe(
                  (profiles: Profile[]) => {
                    this.myPatients.push(profiles[0]);
                  }
                );
              }
            )
  
          }
        );
      }

    } else {
      
      this.appointmentService.getDocuments().subscribe(
        (appointments: Appointment[]) => {
          let patientsIds: string[] = [];
          
          appointments.forEach(
            (appointment) => {
              if (appointment.status == 4 && !patientsIds.includes(appointment.idPatient)) {
                patientsIds.push(appointment.idPatient);
              }
            }
          );

          patientsIds.forEach(
            (patientId: string) => {
              this.profileService.getProfileByUID(patientId).pipe(first()).subscribe(
                (profiles: Profile[]) => {
                  this.myPatients.push(profiles[0]);
                }
              );
            }
          )

        }
      );
      
    }

    

  }

  getLastAppointmentsByPatientId(patientId: string, maxAmount: number) {

    let retArray: Appointment[] = [];
    let appointmentsFound = 0;

    for (let i = 0; i < this.myAppointments.length; i++) {

      if( appointmentsFound < maxAmount ) {
      
        if (this.myAppointments[i].status == 4 && this.myAppointments[i].idPatient == patientId) {

          retArray.push(this.myAppointments[i]);
          appointmentsFound++;

        }

      } else break;

    }

    return retArray;

  }

  navigateToCr(uid: string) {

    var navigateTo = '/clinical-record/state';

    var navigationExtras = {
      queryParams: { uid: uid },
      replaceUrl: true
    };

    this.router.navigate([navigateTo], navigationExtras);

  }

}
