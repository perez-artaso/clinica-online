import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentOffer } from 'src/app/models/appointment-offer';
import { DailyDisponibility } from 'src/app/models/daily-disponibility';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-appointment-offer',
  templateUrl: './appointment-offer.component.html',
  styleUrls: ['./appointment-offer.component.css']
})
export class AppointmentOfferComponent implements AfterViewInit {

  @Input('disponibilities') disponibilities: Array<DailyDisponibility> = [];
  @Input('appointments') appointments: Array<Appointment> = [];

  @Output('selectedDate') selectedDateEmitter = new EventEmitter<Date>();

  appointmentOffers: Array<AppointmentOffer> = [];
  
  possibleDays: Array<Date> = [];
  possibleTimes: Array<AppointmentOffer> = [];

  displayTimes: boolean = false;

  constructor(public dates: DateService) { }

  ngAfterViewInit(): void {
    /*this.GenerateAppointmentOffers();
    this.FilterAndDisplayOffers();*/
    this.setPossibleDays();
  }

  setPossibleDays() {
    for (let i = 0; i < this.disponibilities.length; i++) {

      this.possibleDays.push(
        this.getNextWeeksDesiredDaysDate(1, this.disponibilities[i].day)
      )

      this.possibleDays.push(
        this.getNextWeeksDesiredDaysDate(2, this.disponibilities[i].day)
      )

    }

  }

  onSelectedDay(date: Date) {
    
    let _dailyDisponibility: DailyDisponibility = new DailyDisponibility();
    console.log("entered on select day")
    this.disponibilities.forEach(
      (disponibility) => {

        if (disponibility.day == date.getDay()) {
          _dailyDisponibility = disponibility;
        }

      }
    );

    if (_dailyDisponibility.day != 0) {
      this.appointmentOffersTimestampBreakdown(date, _dailyDisponibility.from, _dailyDisponibility.to, 30, this.possibleTimes);
      this.possibleTimes = this.GetFilteredAppointmentOffers(this.possibleTimes);
      this.displayTimes = true;
    }

  }

  GetFilteredAppointmentOffers(offers: AppointmentOffer[]): AppointmentOffer[] {

    this.appointments.forEach(

      (appointment: Appointment) => {
        offers.forEach(
          (offer, i, self) => {
            if (appointment.timestamp == offer.timestamp && ( appointment.status == 0 || appointment.status == 3)) {
              offers = self.slice(0, i).concat(self.slice(i+1))
            }
          }
        );
      }

    );

    return offers;

  }

  FilterAndDisplayOffers() {
    this.appointments.forEach(

      (appointment: Appointment) => {
        this.appointmentOffers.forEach(
          (offer, i, self) => {
            if (appointment.timestamp == offer.timestamp && ( appointment.status == 0 || appointment.status == 3)) {
              this.appointmentOffers = self.slice(0, i).concat(self.slice(i+1))
            }
          }
        );
      }

    );

  }

  GenerateAppointmentOffers() {
    
    for (let i = 0; i < this.disponibilities.length; i++) {

      this.appointmentOffersTimestampBreakdown(
        this.getNextWeeksDesiredDaysDate(1, this.disponibilities[i].day),
        this.disponibilities[i].from,
        this.disponibilities[i].to,
        30,
        this.appointmentOffers
      );

      this.appointmentOffersTimestampBreakdown(
        this.getNextWeeksDesiredDaysDate(2, this.disponibilities[i].day),
        this.disponibilities[i].from,
        this.disponibilities[i].to,
        30,
        this.appointmentOffers
      );

    }

  }

  getNextWeeksDesiredDaysDate(weeksFromNow: number, dayOfTheWeek: number): Date {

    const now = new Date();
    let future = new Date();

    if ( now.getDay() < dayOfTheWeek ) {

      future.setDate( now.getDate() + (weeksFromNow * 7) - (7 + (now.getDay() - dayOfTheWeek)) );

    } else {

      future.setDate( now.getDate() + (weeksFromNow * 7) - (7 - ( 7 - ( now.getDay() - dayOfTheWeek ) )) );

    }

    return future;

  }

  appointmentOffersTimestampBreakdown (date: Date, fromHours: string, toHours: string, appointmentsDuration: number, timestampBreakdownStorage: Array<AppointmentOffer>) {

    let opening = new Date(date);
    let closure = new Date(date);

    let splittedFromHour = fromHours.split(":");
    let splittedToHour = toHours.split(":");

    opening.setHours(Number(splittedFromHour[0]), Number(splittedFromHour[1]), 0, 0);
    closure.setHours(Number(splittedToHour[0]), Number(splittedToHour[1]), 0, 0);

    for ( let i = opening.getTime(); i < closure.getTime(); i = i + (1000 * 60 * appointmentsDuration) ) {
      timestampBreakdownStorage.push(new AppointmentOffer(i.toString()));
    }

  }

  emmitSelectedDate(timestamp: string): void {
    this.selectedDateEmitter.emit(new Date(Number(timestamp)));
  }

}
