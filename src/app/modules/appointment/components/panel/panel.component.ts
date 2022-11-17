import { Component, OnInit } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { IActionRequest } from 'src/app/models/iaction-requested';
import { IClinicalRecord } from 'src/app/models/iclinical-record';
import { Profile } from 'src/app/models/profile';
import { AdminMessagePipe } from 'src/app/pipes/admin-message.pipe';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';
import { DateService } from 'src/app/services/date.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  userProfile: Profile = new Profile();

  appointments: Appointment[] = [];
  appointmentsBackup: Appointment[] = [];

  clinicalRecords: IClinicalRecord[] = [];

  profiles: any[] = [];

  revealCancelationMessageInput: boolean = false;
  revealCalificationInput: boolean = false;
  revealSpecialistComment: boolean = false;

  selectedAppointment: Appointment = new Appointment();

  calificationArray: Array<number> = [];

  comment: string = "";

  constructor(private router: Router, private auth: AuthService, private profileService: ProfileService, private clinicalRecordService: ClinicalRecordService, public dates: DateService, private appointmentService: AppointmentService, private loading: LoadingService, private adminMessagePipe: AdminMessagePipe) {
    
  }

  ngOnInit(): void {
    
    this.userProfile = this.auth.GetCurrentUserProfile();
    this.loadAppointments();
    this.getProfiles();

  }

  getPatientsAppointments(idPatient: string) {

    this.appointmentService.getAppointmentsByPatientId(idPatient).pipe(first()).subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
        this.appointmentsBackup = Appointment.parseArrayOfLiteralObjectsToInstances(a);
      }
    );

  }

  getSpecialistAppointments(idSpecialist: string) {

    this.appointmentService.getAppointmentsBySpecialistId(idSpecialist).pipe(first()).subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
        this.appointmentsBackup = Appointment.parseArrayOfLiteralObjectsToInstances(a);
      }
    );

  }

  getAppointments() {
    this.appointmentService.getDocuments().subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
        this.appointmentsBackup = Appointment.parseArrayOfLiteralObjectsToInstances(a);
      }
    );
  }

  getClinicalRecords() {
    this.clinicalRecordService.getDocuments().subscribe(
      (crs: IClinicalRecord[]) => {
        this.clinicalRecords = crs;
      }
    );
  }

  getProfiles() {
    this.profileService.getDocuments().subscribe(
      (p) => {
        this.profiles = p
      }
    );
  }

  loadAppointments() {
    switch (this.userProfile.role) {
      case 0:
        this.getPatientsAppointments(this.userProfile.uid);
      break;
      case 1:
        this.getSpecialistAppointments(this.userProfile.uid);
        this.getClinicalRecords();
      break;
      case 2:
        this.getAppointments();
        this.getClinicalRecords();
      break;
    }
  }

  filter(filterElement: HTMLInputElement) {

    const dateManager = new Date();
    
    if (filterElement.value != "") {

      let filteredAppointments: Appointment[] = [];

      let valueToSearch: string = "";
      let keyToSearch: string = "";
  
      const splittedKey: string[] = filterElement.value.split(":");
      
      if (splittedKey.length > 1 && isNaN(Number(splittedKey[0]))) {
        valueToSearch = splittedKey[1];
        keyToSearch = splittedKey[0];
      } else {
        valueToSearch = filterElement.value;
      }
  
      if (this.userProfile.role == 1 || this.userProfile.role == 2) {
  
        this.clinicalRecords.forEach(
          (cr: IClinicalRecord) => {
  
            let property: keyof typeof cr;
  
            for (property in cr) {
  
              if (keyToSearch == "") {
                
                if ( cr[property].toString().toLowerCase().includes(valueToSearch.toLowerCase()) ) {
  
                  this.appointmentsBackup.forEach (
  
                    (appointment: Appointment) => {
  
                      if (appointment.idPatient == cr['uid']) {
  
                        if (!filteredAppointments.includes(appointment)) {
                          filteredAppointments.push(appointment);
                        }
  
                      }
  
                    }
  
                  );
  
                }
  
              } else {
                
                if ( cr[property].toString().toLowerCase().includes(valueToSearch.toLowerCase()) && property.toLowerCase().includes(keyToSearch.toLowerCase()) ) {

                  this.appointmentsBackup.forEach (
                    (appointment: Appointment) => {

                      if (appointment.idPatient == cr['uid']) {
  
                        if (!filteredAppointments.includes(appointment)) {
                          filteredAppointments.push(appointment);
                        }
  
                      }
  
                    }
                  );
  
                }
  
              }
  
            }
  
          }
        );
  
      }

      this.profiles.forEach(
        (prof: any) => {

          let property: keyof typeof prof;

          for (property in prof) {

            if (keyToSearch == "") {
              
              if ( prof[property].toString().toLowerCase().includes(valueToSearch.toLowerCase()) ) {

                this.appointmentsBackup.forEach (

                  (appointment: Appointment) => {

                    if (
                      (appointment.idPatient == prof['uid'] && (this.userProfile.role == 1 || this.userProfile.role == 2)) 
                      || 
                      (appointment.idSpecialist == prof['uid'] && this.userProfile.role == 0)
                    ) {

                      if (!filteredAppointments.includes(appointment)) {
                        filteredAppointments.push(appointment);
                      }

                    }

                  }

                );

              }

            } else {
              
              if ( prof[property].toString().toLowerCase().includes(valueToSearch.toLowerCase()) && property.toLowerCase().includes(keyToSearch.toLowerCase()) ) {

                this.appointmentsBackup.forEach (
                  (appointment: Appointment) => {

                    if (
                      (appointment.idPatient == prof['uid'] && (this.userProfile.role == 1 || this.userProfile.role == 2)) 
                      || 
                      (appointment.idSpecialist == prof['uid'] && this.userProfile.role == 0)
                    ) {

                      if (!filteredAppointments.includes(appointment)) {
                        filteredAppointments.push(appointment);
                      }

                    }

                  }
                );

              }

            }

          }

        }
      );

      this.appointmentsBackup.forEach(
  
        (appointment: Appointment)=> {
  
          let property: keyof typeof appointment;
  
          for ( property in appointment ) {
  
            if (keyToSearch == "") { 
  
              if (
                appointment[property].toString().toLowerCase().includes(valueToSearch.toLowerCase())
                ||
                (
                  property == 'timestamp' 
                  && 
                  dateManager.setTime(Number(appointment[property])) 
                  && 
                  (
                    dateManager.toLocaleDateString().toLowerCase().includes(valueToSearch.toLowerCase())
                    ||
                    dateManager.toLocaleTimeString().toLowerCase().includes(valueToSearch.toLowerCase())
                  )
                )
              ) {

                if (!filteredAppointments.includes(appointment)) {
  
                  filteredAppointments.push(appointment);
  
                }
  
              }
  
            } else {
  
              if (appointment[property].toString().toLowerCase().includes(valueToSearch.toLowerCase()) && property.toLowerCase().includes(keyToSearch.toLowerCase())) {
  
                if (!filteredAppointments.includes(appointment)) {
  
                  filteredAppointments.push(appointment);
  
                }
  
              }
  
            }
  
          }
  
        }
  
      );
  
      this.appointments = filteredAppointments;

    } else {

      this.appointments = this.appointmentsBackup;

    }

  }

  setComment(messageEvent: any) {
    this.comment = messageEvent.target?.value;
  }

  onActionRequested(actionRequest: IActionRequest) {
    
    this.selectedAppointment = actionRequest.appointment;

    switch (actionRequest.action) {

      case 'cancelationByPatient':
        this.selectedAppointment.status = 5;
        this.revealCancelationMessageInput = true;
      break;

      case 'calification':
        this.revealCalificationInput = true;
      break;

      case 'readSpecialistCommentary':
        this.revealSpecialistComment = true;
      break;
      
      case 'cancelationBySpecialist':
        this.selectedAppointment.status = 1;
        this.revealCancelationMessageInput = true;
      break;

      case 'rejectionBySpecialist':
        this.selectedAppointment.status = 2;
        this.revealCancelationMessageInput = true;
      break;

      case 'acceptanceBySpecialist':
        this.acceptance();
      break;

      case 'finalization':
        this.selectedAppointment.status = 4;
        this.revealCancelationMessageInput = true;
      break;

      case 'calificationView':
      
        this.revealCalificationView()

      break;

      case 'cancelationByAdmin':
        this.selectedAppointment.status = 1;
        this.revealCancelationMessageInput = true;
      break;

    }

  }

  revealCalificationView() {

    for (let i = 0; i < this.selectedAppointment.calification; i++) {
      this.calificationArray.push(i);
    }

    this.revealSpecialistComment = true;

  }

  acceptance() {

    this.selectedAppointment.status = 3;

    this.loading.loadingStart();

    this.appointmentService.updateDocument(this.selectedAppointment.id, this.selectedAppointment.getLiteralObjectRepresentation()).then(
      () => {
        this.loading.loadingEnd();
      }
    ).catch (
      () => this.loading.loadingEnd()
    )

  }

  cancelation(userRole: number) {

    if (userRole == 0) {
      this.selectedAppointment.patientComentary = this.comment;
    } else if (userRole == 1) {
      this.selectedAppointment.specialistCommentary = this.comment;
    } else if (userRole == 2) {
      this.selectedAppointment.specialistCommentary = this.adminMessagePipe.transform(this.comment);
    }
    
    this.loading.loadingStart();

    this.appointmentService.updateDocument(this.selectedAppointment.id, this.selectedAppointment.getLiteralObjectRepresentation()).then(
      () => {
        this.loading.loadingEnd();
      }
    ).catch (
      () => this.loading.loadingEnd()
    )

    this.revealCancelationMessageInput = false;

    if (this.selectedAppointment.status == 4) {

      var navigateTo = '/clinical-record/state';

      var navigationExtras = {
        queryParams: { uid: this.selectedAppointment.idPatient },
        replaceUrl: true
      };

      this.router.navigate([navigateTo], navigationExtras);
    }

  }


  calificate() {

    this.selectedAppointment.patientComentary = this.comment;

    this.loading.loadingStart();

    this.appointmentService.updateDocument(this.selectedAppointment.id, this.selectedAppointment.getLiteralObjectRepresentation()).then(
      () => this.loading.loadingEnd()
    ).catch (
      () => this.loading.loadingEnd()
    )

    this.revealCalificationInput = false;
  }

  setCalification(stars: number) {
    this.selectedAppointment.calification = stars;
  }



}
