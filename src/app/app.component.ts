import { Component } from '@angular/core';
import { DailyDisponibility } from './models/daily-disponibility';
import { Disponibility } from './models/disponibility';
import { SpecialistDisponibility } from './models/specialist-disponibility';
import { AuthService } from './services/auth.service';
import { SpecialistDisponibilityService } from './services/specialist-disponibility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor () {}

}
