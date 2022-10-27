import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private collectionPath = '/profiles'; 
  private loginLogsCollection: AngularFirestoreCollection<Profile>;

  constructor(private firestore: AngularFirestore) { 
    this.loginLogsCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<Profile[]> {
    return this.loginLogsCollection.valueChanges({idField: 'id'});
  }

  public addDocument(loginLog: Profile): Promise<DocumentReference<Profile>> {
    return this.loginLogsCollection.add(loginLog);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.loginLogsCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.loginLogsCollection.doc(documentId).delete();
  }



}
