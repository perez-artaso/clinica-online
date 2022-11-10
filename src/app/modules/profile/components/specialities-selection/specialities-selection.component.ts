import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpecialityService } from 'src/app/modules/register/services/speciality.service';
import { Speciality } from '../../models/speciality';


@Component({
  selector: 'app-specialities-selection',
  templateUrl: './specialities-selection.component.html',
  styleUrls: ['./specialities-selection.component.css']
})
export class SpecialitiesSelectionComponent implements OnInit {

  newSpeciality: string = "";
  specialities: Array<Speciality> = [];

  @Output('speciality') specialityEmitter: EventEmitter<Speciality> = new EventEmitter<Speciality>();

  constructor(private specialityService: SpecialityService) { }

  ngOnInit(): void {
    this.specialityService.getDocuments().subscribe( s => this.specialities = s );
  }

  emmitSpeciality(speciality: any) {
    this.specialityEmitter.emit(speciality);
  }

  emmitNewSpeciality() {
    this.specialityEmitter.emit(new Speciality(this.newSpeciality));
  }

}
