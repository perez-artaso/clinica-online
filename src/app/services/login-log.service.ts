import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { LoginLog } from '../models/login-log';

@Injectable({
  providedIn: 'root'
})
export class LoginLogsService {

  private collectionPath = '/login-logs';
  private loginLogsCollection: AngularFirestoreCollection<LoginLog>;

  constructor(private firestore: AngularFirestore) { 
    this.loginLogsCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<LoginLog[]> {
    return this.loginLogsCollection.valueChanges({idField: 'id'});
  }

  public addDocument(loginLog: LoginLog): Promise<DocumentReference<LoginLog>> {
    return this.loginLogsCollection.add(loginLog);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.loginLogsCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.loginLogsCollection.doc(documentId).delete();
  }

}
