import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { first } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { IActionRequest } from 'src/app/models/iaction-requested';
import { Profile } from 'src/app/models/profile';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
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

  revealCancelationMessageInput: boolean = false;
  revealCalificationInput: boolean = false;
  revealSpecialistComment: boolean = false;

  selectedAppointment: Appointment = new Appointment();

  calificationArray: Array<number> = [];

  comment: string = "";

  constructor(private auth: AuthService, private profileService: ProfileService, public dates: DateService, private appointmentService: AppointmentService, private loading: LoadingService) {
    
  }

  ngOnInit(): void {
    
    this.userProfile = this.auth.GetCurrentUserProfile();
    this.loadAppointments();

  }

  getPatientsAppointments(idPatient: string) {

    this.appointmentService.getAppointmentsByPatientId(idPatient).pipe(first()).subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
      }
    );

  }

  getSpecialistAppointments(idSpecialist: string) {

    this.appointmentService.getAppointmentsBySpecialistId(idSpecialist).pipe(first()).subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
      }
    );

  }

  getAppointments() {
    this.appointmentService.getDocuments().subscribe(
      (a: Appointment[]) => { 
        this.appointments = Appointment.parseArrayOfLiteralObjectsToInstances(a);
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
      break;
      case 2:
        this.getAppointments();
      break;
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
      this.selectedAppointment.specialistCommentary = "[Mensaje Del Administrador]: " + this.comment;
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
