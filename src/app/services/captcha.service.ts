import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference  } from '@angular/fire/compat/firestore'
import { Observable, Subject } from 'rxjs';
import { ICaptchaObject } from '../models/captcha-object';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  private display$: Subject<boolean> = new Subject<boolean>();
  private notifyer$: Subject<string> = new Subject<string>();

  private collectionPath = '/captcha'; 
  private captchaCollection: AngularFirestoreCollection<ICaptchaObject>;

  constructor(private firestore: AngularFirestore) { 
    this.captchaCollection = firestore.collection(this.collectionPath);
  }

  public getDocuments(): Observable<ICaptchaObject[]> {
    return this.captchaCollection.valueChanges();
  }

  public addDocument(appointment: ICaptchaObject): Promise<DocumentReference<ICaptchaObject>> {
    return this.captchaCollection.add(appointment);
  }

  public updateDocument(documentId: string, newValues: Object) {
    return this.captchaCollection.doc(documentId).update(newValues);
  }

  public deleteDocument(documentId: string) {
    return this.captchaCollection.doc(documentId).delete();
  }

  public getCaptchaObjectByImage(img: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("img", "==", img)).valueChanges();
  }

  public getCaptchaObjectByName(name: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("name", "==", name)).valueChanges();
  }

  public getCaptchaObjectByImgCode(imgCode: string): any {
    return this.firestore.collection(this.collectionPath, ref => ref.where("imgCode", "==", imgCode)).valueChanges();
  }

  public CaptchaNotifications() {
    return this.notifyer$;
  }

  public NotifySuccess() {
    this.notifyer$.next('success');
  }

  public NotifyFailure() {
    this.notifyer$.next('failure');
  }

  public DisplayNotifications() {
    return this.display$;
  }

  public RevealCaptcha() {
    this.display$.next(true);
  }

  public HideCaptcha() {
    this.display$.next(false);
  }

}
