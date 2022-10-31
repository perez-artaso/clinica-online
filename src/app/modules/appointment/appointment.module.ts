import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';


@NgModule({
  declarations: [
    PanelComponent,
    AppointmentCardComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
