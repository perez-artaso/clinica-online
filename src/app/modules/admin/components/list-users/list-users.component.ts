import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Appointment } from 'src/app/models/appointment';
import { ProfileImages } from 'src/app/models/profile-images';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DateService } from 'src/app/services/date.service';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: Array<any> = [];
  profileImages: Array<ProfileImages> = [];
  appointments: Array<Appointment> = [];

  appointmentsByPatient: Array<Appointment> = [];

  constructor(
    private profileService: ProfileService, 
    private profileImagesService: ProfileImagesService, 
    private sanitizer: DomSanitizer, 
    private appointmentService: AppointmentService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {

    this.profileImagesService.getDocuments().subscribe(
      (pImgs: Array<ProfileImages>) => {
        this.profileImages = pImgs;

        this.profileService.getDocuments().subscribe(
          (userProfiles) => {
            this.users = userProfiles;
          }
        );   

      }
    );

    this.appointmentService.getAppointmentsByStatus(4).subscribe(
      (finalizedAppointments: Appointment[]) => {
        this.appointments = finalizedAppointments;
      } 
    );


  }

  getSanitizedSrc(src: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' + src );
  }

  exportAsExcel(tableElement: any) {

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, "usuarios-clinica-online.xlsx");

  }

  getUserSpecialities(user: any): string {

    let specialities = "";

    if(user.specialities) {
      
      user.specialities.forEach(
        (s: any) => specialities += s + ", "
      );

      specialities = specialities.slice(0, specialities.length-2);

    }

    return specialities;

  }

  getUserProfileImageByUid(uid: string) {
    
    let imgSrc = this.getSanitizedSrc(environment.templateImg);

    for (let i = 0; i < this.profileImages.length; i++) {
      if (this.profileImages[i].uid == uid) {
        imgSrc = this.getSanitizedSrc(this.profileImages[i].images[0]);
      }
    }

    return imgSrc;

  }

  getRoleAsString(role: number): string {
    switch(role) {
      case 0: return "Paciente";
      case 1: return "Especialista";
      case 2: return "Administrador";
      default: return "";
    }
  }

  getAppointmentsByUid(uid: string) {

    let retArray: Appointment[] = [];

    for (let i = 0; i < this.appointments.length; i++) {
      
      if (this.appointments[i].idPatient == uid) {

        retArray.push(this.appointments[i]);

      }

    }

    return retArray;

  }

  exportAppointmentsByPatientAsXlsx(tableElement: any, user: any) {

    if (user.role == 0) {

      this.appointmentsByPatient = this.getAppointmentsByUid(user.uid);

      setTimeout(
        ()=> {
          const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(tableElement);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
      
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
          XLSX.writeFile(wb, user.last_name + ".xlsx");
        },
        0
      )      
      
    }

  }

  getUserFullNameByUid(uid: string) {

    let userFullName: string = "";

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid == uid) {
        userFullName = this.users[i].name + " " + this.users[i].last_name;
      }
    }

    return userFullName;

  }



}