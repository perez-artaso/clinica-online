import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { SpecialistDisponibility } from '../models/specialist-disponibility';

@Injectable({
  providedIn: 'root'
})
export class SpecialistDisponibilityService {

  private collectionPath = '/specialist-disponibilities'; 
  private specialistDisponibilitiesCollection: AngularFirestoreCollection<SpecialistDisponibility>;

  constructor(private firestore: AngularFirestore) { 
    this.specialistDisponibilitiesCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<SpecialistDisponibility[]> {
    return this.specialistDisponibilitiesCollection.valueChanges({idField: 'id'});
  }

  public addDocument(specialistDisponibility: SpecialistDisponibility): Promise<DocumentReference<SpecialistDisponibility>> {
    return this.specialistDisponibilitiesCollection.add(specialistDisponibility);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.specialistDisponibilitiesCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.specialistDisponibilitiesCollection.doc(documentId).delete();
  }

  public getDisponibilitiesByUID(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("specialistId", "==", uid)).valueChanges({idField: 'id'});
  }

}
