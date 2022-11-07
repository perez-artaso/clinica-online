import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { IClinicalRecord } from '../models/iclinical-record';

@Injectable({
  providedIn: 'root'
})
export class ClinicalRecordService {

  private collectionPath = '/clinical-records'; 
  private clinicalRecordsCollection: AngularFirestoreCollection<IClinicalRecord>;

  constructor(private firestore: AngularFirestore) { 
    this.clinicalRecordsCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<IClinicalRecord[]> {
    return this.clinicalRecordsCollection.valueChanges({idField: 'id'});
  }

  public addDocument(appointment: IClinicalRecord): Promise<DocumentReference<IClinicalRecord>> {
    return this.clinicalRecordsCollection.add(appointment);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.clinicalRecordsCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.clinicalRecordsCollection.doc(documentId).delete();
  }

  public getClinicalRecordsByUid(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("uid", "==", uid)).valueChanges({idField: 'id'});
  }


}