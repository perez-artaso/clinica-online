import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';
import { MmsDirective } from './directives/mms.directive';
import { CreateAppointmentFirstStepComponent } from './components/create-appointment-first-step/create-appointment-first-step.component';
import { AppointmentOfferComponent } from './components/appointment-offer/appointment-offer.component';
import { AppointmentConfirmationComponent } from './components/appointment-confirmation/appointment-confirmation.component';


@NgModule({
  declarations: [
    PanelComponent,
    AppointmentCardComponent,
    CreateAppointmentComponent,
    MmsDirective,
    CreateAppointmentFirstStepComponent,
    AppointmentOfferComponent,
    AppointmentConfirmationComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
