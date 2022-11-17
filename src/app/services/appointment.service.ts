import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private collectionPath = '/appointments'; 
  private apponintmentsCollection: AngularFirestoreCollection<Appointment>;

  constructor(private firestore: AngularFirestore) { 
    this.apponintmentsCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<Appointment[]> {
    return this.apponintmentsCollection.valueChanges({idField: 'id'});
  }

  public addDocument(appointment: Appointment): Promise<DocumentReference<Appointment>> {
    return this.apponintmentsCollection.add(appointment);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.apponintmentsCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.apponintmentsCollection.doc(documentId).delete();
  }

  public getAppointmentsBySpecialistId(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("idSpecialist", "==", uid)).valueChanges({idField: 'id'});
  }

  public getAppointmentsByPatientId(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("idPatient", "==", uid)).valueChanges({idField: 'id'});
  }

  public getAppointmentsByStatus(status: number): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("status", "==", status)).valueChanges({idField: 'id'});
  }


}
