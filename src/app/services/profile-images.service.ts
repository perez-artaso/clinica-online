import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { ProfileImages } from '../models/profile-images';

@Injectable({
  providedIn: 'root'
})
export class ProfileImagesService {

  private collectionPath = '/profile-images'; 
  private loginLogsCollection: AngularFirestoreCollection<ProfileImages>;

  constructor(private firestore: AngularFirestore) { 
    this.loginLogsCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<ProfileImages[]> {
    return this.loginLogsCollection.valueChanges({idField: 'id'});
  }

  public addDocument(loginLog: ProfileImages): Promise<DocumentReference<ProfileImages>> {
    return this.loginLogsCollection.add(loginLog);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.loginLogsCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.loginLogsCollection.doc(documentId).delete();
  }

  public getImagesByUID(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("uid", "==", uid)).valueChanges({idField: 'id'});
  }

}
