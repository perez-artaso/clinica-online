import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private collectionPath = '/profiles'; 
  private profilesCollection: AngularFirestoreCollection<Profile>;

  constructor(private firestore: AngularFirestore) { 
    this.profilesCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<Profile[]> {
    return this.profilesCollection.valueChanges({idField: 'id'});
  }

  public addDocument(loginLog: Profile): Promise<DocumentReference<Profile>> {
    return this.profilesCollection.add(loginLog);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.profilesCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.profilesCollection.doc(documentId).delete();
  }

  public getProfileByUID(uid: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("uid", "==", uid)).valueChanges({idField: 'id'});
  }

  public getProfileByUserMail(email: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("user_email", "==", email)).valueChanges({idField: 'id'});
  }

  public getPatientProfiles(): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("role", "==", 0)).valueChanges({idField: 'id'});
  }

  public getSpecialistsProfiles(): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("role", "==", 1)).valueChanges({idField: 'id'});
  }

  public getAdminProfiles(): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("role", "==", 2)).valueChanges({idField: 'id'});
  }

}
