import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-appointment-confirmation',
  templateUrl: './appointment-confirmation.component.html',
  styleUrls: ['./appointment-confirmation.component.css']
})
export class AppointmentConfirmationComponent {

  @Input('appointment') appointment: Appointment = new Appointment();
  @Input('specialistFullName') specialistFullName: string = "";

  @Output('onCancelation') cancelationEmitter = new EventEmitter<void>();

  revealSuccessMessage: boolean = false;
  revealErrorMessage: boolean = false;

  constructor(private appointments: AppointmentService, private router: Router, public dates: DateService) { }

  onConfirmation(): void {

    this.appointments.addDocument(this.appointment.getLiteralObjectRepresentation()).then(
      () => {

        this.revealSuccessMessage = true;

        setTimeout(
          () => this.router.navigate(['/home']), 2000
        );

      }      
    ).catch(
      () => {

        this.revealErrorMessage = true;

        setTimeout(
          () => this.router.navigate(['/home']), 4000
        );

      }
    );

  }

  onCancelation(): void {
    this.cancelationEmitter.emit();
  }


}
