import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs';
import { ICaptchaObject } from 'src/app/models/captcha-object';
import { CaptchaService } from 'src/app/services/captcha.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  display: boolean = false;

  @Output('onAttemptsLimitReached') failureEmitter = new EventEmitter<void>();
  @Output('onSuccess') successEmitter = new EventEmitter<void>();

  captchaObjects: Array<ICaptchaObject> = [];
  imageSources = [];

  revealSuccessMessage: boolean = false;
  revealErrorMessage: boolean = false;

  selectedCaptchaObject: ICaptchaObject = {
    img: "",
    imgCode: "",
    name: "cargando..."
  } as ICaptchaObject;

  remainingAttempts: number = 3;

  constructor(public captcha: CaptchaService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.captcha.DisplayNotifications().subscribe(
      d => this.display = d
    );

    this.captcha.getDocuments().pipe(first()).subscribe(
      (co: ICaptchaObject[]) => {
        this.captchaObjects = co;
        this.selectRandomCaptchaObject();
      }
    );
    
  }

  getSanitizedSrc(src: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' + src );
  }

  selectRandomCaptchaObject() {
    this.selectedCaptchaObject = this.captchaObjects[this.getRandomIntInRange(0, this.captchaObjects.length)];
  }

  getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onImageSelected(imgCode: String) {

    if (this.selectedCaptchaObject.imgCode == imgCode) {
      this.onSuccess();
    } else {
      this.onError();
    }

  }

  onSuccess() {
    this.revealSuccessMessage = true;
    this.revealErrorMessage = false;

    setTimeout( ()=> {
      this.successEmitter.emit(); 
      this.captcha.NotifySuccess();
    }, 1500 );

  }

  onError() {

    this.revealErrorMessage = true;

    this.remainingAttempts--;

    if (this.remainingAttempts == 0) {
      this.failureEmitter.emit();
      this.captcha.NotifyFailure();
    }

  }

}
