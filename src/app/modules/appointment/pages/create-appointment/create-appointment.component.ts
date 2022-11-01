import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { MmsState } from 'src/app/models/mms-state';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { NavbarService } from 'src/app/services/navbar.service';
import { ISpecialityAndSpecialist } from '../../models/speciality-and-specialist';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {

  mms: MmsState = new MmsState(0, 90);

  newAppointment: Appointment = new Appointment();
  dateManager: Date = new Date();

  constructor(private nabvar: NavbarService) { }

  ngOnInit(): void {
    this.nabvar.showNavbar();
  }

  receiveSpecialityAndSpecialist(specialityAndSpecialist: ISpecialityAndSpecialist) {
    this.newAppointment.idSpecialist = specialityAndSpecialist.specialist.uid;
    this.newAppointment.speciality = specialityAndSpecialist.speciality;

    console.dir(this.newAppointment);
    this.move(1);
  }

  move(times: number, mode: string = "f"): void {

    if (mode == 'b') {

      for(let i = 0; i < times; i++) {
        this.moveRight();
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

}
