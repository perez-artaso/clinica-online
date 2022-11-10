import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { Profile } from 'src/app/models/profile';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-list-crs',
  templateUrl: './list-crs.component.html',
  styleUrls: ['./list-crs.component.css']
})
export class ListCrsComponent implements OnInit {

  myPatients: Profile[] = [];

  constructor(private appointmentService: AppointmentService, private profileService: ProfileService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const specialistId = this.auth.GetCurrentUserID()

    if (this.auth.GetCurrentUserProfile().role == 1) {

      if (specialistId) {
        this.appointmentService.getAppointmentsBySpecialistId(specialistId).subscribe(
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

  navigateToCr(uid: string) {

    var navigateTo = '/clinical-record/state';

    var navigationExtras = {
      queryParams: { uid: uid },
      replaceUrl: true
    };

    this.router.navigate([navigateTo], navigationExtras);

  }

}
