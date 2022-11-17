import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { ProfileImages } from 'src/app/models/profile-images';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DateService } from 'src/app/services/date.service';

interface IPdfMake{ vfs: { [file: string]: string }  }

(pdfMake as IPdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  @Input('profile') profile: Profile = new Profile();
  @Input('profileImages') profileImages: ProfileImages = new ProfileImages();

  myAppointments: Array<Appointment> = [];
  userProfiles: any[] = [];

  patientProfileForm: FormGroup = new FormGroup({

    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.compose([Validators.required, Validators.min(18), Validators.max(120)])),
    id_number: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}/)])),
    user_email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),

  });

  revealSpecialities: boolean = false;

  uploadImageErrorOcurred: boolean = false;

  profileImageUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer, 
    private profiles: ProfileService, 
    private imagesService: ProfileImagesService, 
    private appointmentService: AppointmentService, 
    private dateService: DateService) {
    this.profileImageUrl = this.getSanitizedSrc(environment.templateImg);
  }

  ngOnInit(): void {

    this.disableFields();

    this.appointmentService.getAppointmentsByPatientId(this.profile.uid).subscribe(
      
      (appointments: Appointment[]) => {
        appointments.forEach(
          (a: Appointment) => {
            if (a.status == 4 && !this.myAppointments.includes(a)) this.myAppointments.push(a)
          }
        )
      }

    );

    this.profiles.getDocuments().subscribe(
      (ps: any[]) => this.userProfiles = ps
    );

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.profileImages.currentValue.images[0]) {
      this.profileImageUrl = this.getSanitizedSrc(changes.profileImages.currentValue.images[0]);
    } else {
      this.profileImageUrl = this.getSanitizedSrc(environment.templateImg);
    }

    if (changes.profile) {

      this.profile = new Profile(changes.profile.currentValue.uid, changes.profile.currentValue.name, changes.profile.currentValue.last_name, changes.profile.currentValue.age, changes.profile.currentValue.id_number, changes.profile.currentValue.user_email, changes.profile.currentValue.role);
      this.profile.setId(changes.profile.currentValue.id);

      this.patientProfileForm.controls['name'].setValue(changes.profile.currentValue.name);
      this.patientProfileForm.controls['last_name'].setValue(changes.profile.currentValue.last_name);
      this.patientProfileForm.controls['age'].setValue(changes.profile.currentValue.age);
      this.patientProfileForm.controls['id_number'].setValue(changes.profile.currentValue.id_number);
      this.patientProfileForm.controls['user_email'].setValue(changes.profile.currentValue.user_email);

    }

  }

  getSpecialistFullNameByUid(uid: string) {
    let retStr = "";
    for (let i = 0; i < this.userProfiles.length; i++) {
      if(this.userProfiles[i].uid == uid) {
        retStr = this.userProfiles[i].name + " " + this.userProfiles[i].last_name
      }
    }
    return retStr;
  }

  exportAppointmentsReportBySpeciality(speciality: string) {

    let appointmentsOrderedList = {
      ol: [

      ]
    };

    this.myAppointments.forEach(
      (a: Appointment) => {
        if (a.speciality == speciality) {
          (appointmentsOrderedList.ol as any[]).push(
            {
              ul: [
                "Especialista: " + this.getSpecialistFullNameByUid(a.idSpecialist),
                "Fecha: " + this.dateService.getLocaleDateStringByTimestamp(a.timestamp) + " " + this.dateService.getLocaleTimeStringByTimestamp(a.timestamp),
                "Duración: " + a.duration + " minutos",
                "Comentarios del especialista: " + a.specialistCommentary
              ],
              margin: [0, 11]
            }
          )
        }
      }
    ); 

    const pdfDefintition: any = {
      content: [
        {
          image: 'data:image/jpg;base64,' + environment.clinicLogo,
          width: 200,
          height: 200,
          alignment: 'center'
        },
        {
          text: speciality,
          fontSize: 22,
          bold: true,
          margin: [0, 11]
        },
        appointmentsOrderedList
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefintition);
    pdf.open();

    this.revealSpecialities = false;

  }

  getSpecialitiesRecord(): Array<string> {
    
    let filteredSpecialities: string[] = [];

    this.myAppointments.forEach(

      (a: Appointment) => {
        if (!filteredSpecialities.includes(a.speciality)) filteredSpecialities.push(a.speciality)
      }

    );

    return filteredSpecialities;

  }

  getSanitizedSrc(src: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' + src );
  }

  uploadNewProfileImage(event: any) {

    this.convertFile(event.target.files[0]).subscribe(
      
      (base64: any) => {
        this.profileImages.images[0] = base64;
        console.log(base64);
        this.imagesService.updateDocument(this.profileImages.id, this.profileImages).catch(
          (err) => {this.uploadImageErrorOcurred = true; console.dir(err)}
        )
      }
      
    );
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      if (event && event.target && event.target.result) {
        result.next(btoa(event.target.result.toString()));
      }
    }
    return result;
  }

  disableFields() {
    this.patientProfileForm.controls['name'].disable();
    this.patientProfileForm.controls['last_name'].disable();
    this.patientProfileForm.controls['age'].disable();
    this.patientProfileForm.controls['id_number'].disable();
    this.patientProfileForm.controls['user_email'].disable();
  }

  editFieldRequest(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    editBtn.style.display = "none";
    confirmBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";

    this.patientProfileForm.controls[fieldName].enable();

  }

  cancel(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    editBtn.style.display = "inline-block";
    confirmBtn.style.display = "none";
    cancelBtn.style.display = "none";

    this.patientProfileForm.controls[fieldName].disable();

  }

  update(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    if ( this.patientProfileForm.controls[fieldName].valid ) {

      type ProfileKey = keyof typeof this.profile;
      const propertyName = fieldName as ProfileKey;

      this.profile[propertyName] = this.patientProfileForm.controls[fieldName].value as never;

      this.profiles.updateDocument(this.profile.id, this.profile.getLiteralObjectRepresentation()).then(
        () => {
          editBtn.style.display = "inline-block";
          confirmBtn.style.display = "none";
          cancelBtn.style.display = "none";
          this.patientProfileForm.controls[fieldName].disable();
        }
      ).catch(
        (err) => console.dir(err)
      )
      
    }

  }
}
