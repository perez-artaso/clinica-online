import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { IClinicalRecord } from 'src/app/models/iclinical-record';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';
import { DateService } from 'src/app/services/date.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-cr-state',
  templateUrl: './cr-state.component.html',
  styleUrls: ['./cr-state.component.css']
})
export class CrStateComponent implements OnInit {

  maxDynamicFieldsAllowed: number = 3;
  dynamicFieldsAdded: number = 0;

  dynamicFields: Array<{key:string, value:string}> = [];

  crForm = new FormGroup({
    height: new FormControl(0, Validators.compose([Validators.required, Validators.min(1), Validators.max(300)])),
    weight: new FormControl(0, Validators.compose([Validators.required, Validators.min(1), Validators.max(300)])),
    temperature: new FormControl(0, Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])),
    bloodPressure: new FormControl("", Validators.compose([Validators.required, Validators.pattern(/^[0-9]{1,2}\/[0-9]{1,2}$/)]))
  });

  uid: string = "";

  clinicalRecord: IClinicalRecord = {
    id: "",
    uid: this.uid,
    height: 0,
    weight: 0,
    temperature: 0,
    bloodPressure: ""
  };

  appointments: Appointment[] = [];

  newClinicalRecord: boolean = true;
  succesfulUpdate: boolean = false;
  errorOnUpdate: boolean = false;

  isPatient: boolean = false;

  constructor( public clinicalRecordService: ClinicalRecordService, private appointmentService: AppointmentService, public dateService: DateService, private activatedRoute: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        if(params.uid) {
          this.uid = params.uid;
        } else {

          let userId = this.auth.GetCurrentUserID();

          if (userId) {
            this.uid = userId;
          }
          
        }
      }
    );

    if (this.auth.GetCurrentUserProfile().role == 0) {
      this.isPatient = true;
      this.disableInputs();
    }

    this.initDynamicFields();

    this.clinicalRecordService.getClinicalRecordsByUid(this.uid).subscribe(
      ( crs: Array<IClinicalRecord> ) => {
        if (crs.length > 0) {
          this.clinicalRecord = crs[0];
          this.newClinicalRecord = false;
          this.setClinicalRecordFields();
        }
      }
    );

    this.appointmentService.getAppointmentsByPatientId(this.uid).pipe(first()).subscribe(
      (a: Appointment[]) => {
        a.forEach(
          (appointment: Appointment) => {
            if (appointment.status == 4 && !this.appointments.includes(appointment)) {
              this.appointments.push(appointment);
            }
          }
        );
      }
    );

  }

  onSubmitRequest () {
    
    if (this.crForm.valid) {

      for (let i = 0; i < this.maxDynamicFieldsAllowed; i++) {
        if (this.dynamicFields[i].key != "") {
          this.clinicalRecord[this.dynamicFields[i].key] = this.dynamicFields[i].value;
        }
      }

      this.clinicalRecord.height = Number(this.crForm.controls['height'].value);
      this.clinicalRecord.weight = Number(this.crForm.controls['weight'].value);
      this.clinicalRecord.temperature = Number(this.crForm.controls['temperature'].value);
      this.clinicalRecord.bloodPressure = (this.crForm.controls['bloodPressure'].value ? this.crForm.controls['bloodPressure'].value : "");

      this.submit();

    } else {
      this.crForm.markAllAsTouched()
    }

  }

  disableInputs() {
    this.crForm.controls['height'].disable();
    this.crForm.controls['weight'].disable();
    this.crForm.controls['temperature'].disable();
    this.crForm.controls['bloodPressure'].disable();
  }

  submit() {

    if (this.newClinicalRecord) {

      this.clinicalRecordService.addDocument(
        this.clinicalRecord
      ).then(
        () => this.onSuccess()
      ).catch(
        () => this.onError()
      );

    } else {

      this.clinicalRecordService.updateDocument(
        this.clinicalRecord.id,
        this.clinicalRecord
      ).then(
        () => this.onSuccess()
      ).catch(
        () => this.onError()
      );

    }

  }

  private onSuccess() {
    this.succesfulUpdate = true;
    setTimeout(()=>this.succesfulUpdate = false, 2500);
  }

  private onError() {
    this.errorOnUpdate = true;
    setTimeout(()=>this.errorOnUpdate = false, 2500);
  }

  initDynamicFields() {
    for (let i = 0; i < this.maxDynamicFieldsAllowed; i++) {
      this.dynamicFields[i] = {key: "", value: ""};
    }
  }

  setClinicalRecordFields() {

    this.crForm.controls['height'].setValue(this.clinicalRecord.height);
    this.crForm.controls['weight'].setValue(this.clinicalRecord.weight);
    this.crForm.controls['temperature'].setValue(this.clinicalRecord.temperature);
    this.crForm.controls['bloodPressure'].setValue(this.clinicalRecord.bloodPressure);

    let property: keyof typeof this.clinicalRecord;

    let dynamicFieldIndex = 0;

    for (property in this.clinicalRecord) {

      if (property != 'height' && property != 'weight' && property != 'temperature' && property != 'bloodPressure' && property != 'id' && property != 'uid') {

        this.dynamicFields[dynamicFieldIndex] = {
          key: property,
          value: this.clinicalRecord[property]
        }

        dynamicFieldIndex++;
        this.dynamicFieldsAdded++;

      }

    }

  }

}
