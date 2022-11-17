import { Injectable, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { IAppointmentsBySpecialist } from 'src/app/models/iappointments-by-specialist';
import { LoginLog } from 'src/app/models/login-log';
import { Profile } from 'src/app/models/profile';
import { AppointmentService } from 'src/app/services/appointment.service';
import { LoginLogsService } from 'src/app/services/login-log.service';
import { ProfileService } from 'src/app/services/profile.service';
import { IAppointmentsByDate } from '../models/iappointments-by-date';
import { ILabeledData } from '../models/ilabeled-data';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private _reportsPublisher$: Subject<void> = new Subject<void>();

  private _appointments: Appointment[] = [];
  private _profiles: Profile[] = [];
  private _loginLogs: LoginLog[] = [];

  public ready = false;

  constructor(
    public appointments: AppointmentService,
    public profiles: ProfileService,
    public loginLogService: LoginLogsService
  ) { 
    this.initialize();
  }

  private initialize() {
    this.appointments.getDocuments().subscribe(
      (as: Appointment[]) => {
        this._appointments = as;
        this.VerifyIfReady();
      }
    );

    this.profiles.getDocuments().subscribe(
      (ps: Profile[]) => {
        this._profiles = ps;
        this.VerifyIfReady();
      }
    );

    this.loginLogService.getDocuments().subscribe(
      (ls: LoginLog[]) => {
        this._loginLogs = ls;
        this.VerifyIfReady();
      }
    );
  }

  public ReportsSubscription() {
    return this._reportsPublisher$;
  }

  public ReportsAreReady() {
    this._reportsPublisher$.next();
  }

  private VerifyIfReady() {
    if (
      this._appointments.length > 0
      &&
      this._profiles.length > 0
      &&
      this._loginLogs.length > 0
    ) {
      this.ready = true;
      this.ReportsAreReady();
    }
  }
  
  public GetGroupedAppointmentsByDate(): IAppointmentsByDate {

    let appointmentsByDate: IAppointmentsByDate = {};

    for (let i = 0; i < this._appointments.length; i++) {

      if ( 
        
        appointmentsByDate[
          this.GetUnseparatedPlainDateByTimestamp(
            Number(this._appointments[i].timestamp)
          )
        ]

      ) {

        appointmentsByDate[
          this.GetUnseparatedPlainDateByTimestamp(
            Number(this._appointments[i].timestamp)
          )
        ]++;

      } else {

        appointmentsByDate[
          this.GetUnseparatedPlainDateByTimestamp(
            Number(this._appointments[i].timestamp)
          )
        ] = 1;

      }

    }

    return appointmentsByDate;

  }

  private GetUnseparatedPlainDateByTimestamp(timestamp: number) {

    let dateManager = new Date(timestamp);

    return dateManager.toLocaleDateString();

  }

  public GetLoginLogs() {
    return this.loginLogService.getDocuments();
  }

  public GetAppointmentsBySpecialityAsLabeledData(): Array<ILabeledData> {

    let labeledData: Array<ILabeledData> = [];
    const appoinmentsBySpeciality = this.GetAppoimentsBySpeciality();

    for (let i = 0; i < appoinmentsBySpeciality.length; i++ ) {

      let label = appoinmentsBySpeciality[i][0].speciality;
      let amount = appoinmentsBySpeciality[i].length;

      labeledData.push(
        {
          label: label,
          data: amount
        }
      );

    }

    return labeledData;

  }

  public GetAppoimentsBySpeciality (): Array< Array<Appointment> > {

    let specialityNames: Array<string> = this.GetSpecialityNames();

    let appointmentsBySpecility: Array< Array<Appointment> > = [];

    specialityNames.forEach(
      (sn: string) => {

        appointmentsBySpecility.push(this.GetAppointmentsBySpecialityName(sn));

      }
    );

    return appointmentsBySpecility;

  }

  private GetSpecialityNames () {

    let specialityNames: Array<string> = [];

    this._appointments.forEach(
      
      ( a: Appointment ) => {

        if (!specialityNames.includes(a.speciality)) {
          specialityNames.push(a.speciality)
        }

      }

    );

    return specialityNames;

  }

  public GetAppointmentsBySpecialityName(specialityName: string) {

    return this._appointments.filter(
      (a: Appointment) => {
        return a.speciality == specialityName;
      }
    );

  }
  
  public GetRequestedAppointmentsBySpecialistInRange(fromTimestamp: number, toTimestamp: number): IAppointmentsBySpecialist {
    
    let appoinmentsBySpecialist: IAppointmentsBySpecialist = {};

    this._appointments.forEach(

      (a: Appointment) => {

        if ( Number(a.timestamp) < toTimestamp && Number(a.timestamp) > fromTimestamp ) {
          
          if ( appoinmentsBySpecialist[a.idSpecialist] ) {

            appoinmentsBySpecialist[a.idSpecialist].appointments.push(a);
  
          } else {
            appoinmentsBySpecialist[a.idSpecialist] = {name: "", appointments: []};
            appoinmentsBySpecialist[a.idSpecialist].appointments = [a];
            appoinmentsBySpecialist[a.idSpecialist].name = this.GetSpecialistFullNameByUid(a.idSpecialist);
  
          }

        }

      }

    );

    return appoinmentsBySpecialist;


  }

  public GetFinalizedAppointmentsBySpecialistInRange(fromTimestamp: number, toTimestamp: number) {
    let appoinmentsBySpecialist: IAppointmentsBySpecialist = {};

    this._appointments.forEach(

      (a: Appointment) => {

        if ( a.status == 4 ) {

          if ( Number(a.timestamp) < toTimestamp && Number(a.timestamp) > fromTimestamp ) {
          
            if ( appoinmentsBySpecialist[a.idSpecialist] ) {
  
              appoinmentsBySpecialist[a.idSpecialist].appointments.push(a);
    
            } else {
              appoinmentsBySpecialist[a.idSpecialist] = {name: "", appointments: []};
              appoinmentsBySpecialist[a.idSpecialist].appointments = [a];
              appoinmentsBySpecialist[a.idSpecialist].name = this.GetSpecialistFullNameByUid(a.idSpecialist);
    
            }
  
          }

        }        

      }

    );

    return appoinmentsBySpecialist;
  }

  public GetSpecialistFullNameByUid(uid: string): string {

    let fullName = "";

    this._profiles.forEach(

      (p: Profile) => {

        if (p.uid == uid) {

          fullName = p.name + " " + p.last_name;

        }

      }

    );

    return fullName;

  }

}
