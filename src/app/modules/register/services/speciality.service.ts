import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Speciality } from '../models/speciality';


@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private collectionPath = '/specialities'; 
  private specialitiesCollection: AngularFirestoreCollection<Speciality>;

  constructor(private firestore: AngularFirestore) { 
    this.specialitiesCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<Speciality[]> {
    return this.specialitiesCollection.valueChanges({idField: 'id'});
  }

  public addDocument(loginLog: Speciality): Promise<DocumentReference<Speciality>> {
    return this.specialitiesCollection.add(loginLog);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.specialitiesCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.specialitiesCollection.doc(documentId).delete();
  }



}
