import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClinicalRecord } from 'src/app/models/iclinical-record';
import { ClinicalRecordService } from 'src/app/services/clinical-record.service';

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
    uid: "",
    height: 0,
    weight: 0,
    temperature: 0,
    bloodPressure: ""
  };

  newClinicalRecord: boolean = true;

  constructor( public clinicalRecordService: ClinicalRecordService ) { }

  ngOnInit(): void {

    this.clinicalRecordService.getClinicalRecordsByUid(this.uid).subscribe(
      ( crs: Array<IClinicalRecord> ) => {
        if (crs.length > 0) {
          this.clinicalRecord = crs[0];
          this.newClinicalRecord = false;
        }
      }
    )

    this.getMaxDynamicFieldsArrayRepresentation();

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

  }

  private onError() {

  }

  getMaxDynamicFieldsArrayRepresentation() {
    
    let arrayRepresentation: Array<object> = [];

    for (let i = 0; i < this.maxDynamicFieldsAllowed; i++) {

      arrayRepresentation.push({});

    }

    return arrayRepresentation;

  }

}
