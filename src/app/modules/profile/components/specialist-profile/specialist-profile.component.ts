import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { ProfileImages } from 'src/app/models/profile-images';
import { SpecialistProfile } from 'src/app/models/specialist-profile';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specialist-profile',
  templateUrl: './specialist-profile.component.html',
  styleUrls: ['./specialist-profile.component.css']
})
export class SpecialistProfileComponent implements OnInit, OnChanges {

  @Input('profile') profile: SpecialistProfile = new SpecialistProfile();
  @Input('profileImages') profileImages: ProfileImages = new ProfileImages();

  specialistProfileForm: FormGroup = new FormGroup({

    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.compose([Validators.required, Validators.min(18), Validators.max(120)])),
    id_number: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}/)])),
    user_email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),

  })

  uploadImageErrorOcurred: boolean = false;

  profileImageUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private profiles: ProfileService, private imagesService: ProfileImagesService) {
    this.profileImageUrl = this.getSanitizedSrc(environment.templateImg);
  }

  ngOnInit(): void {
    this.disableFields();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.profileImages.currentValue.images[0]) {
      this.profileImageUrl = this.getSanitizedSrc(changes.profileImages.currentValue.images[0]);
    } else {
      this.profileImageUrl = this.getSanitizedSrc(environment.templateImg);
    }

    if (changes.profile) {

      this.profile = new SpecialistProfile(changes.profile.currentValue.uid, changes.profile.currentValue.name, changes.profile.currentValue.last_name, changes.profile.currentValue.age, changes.profile.currentValue.id_number, changes.profile.currentValue.user_email, changes.profile.currentValue.role, changes.profile.currentValue.approved, changes.profile.currentValue.specialities)
      this.profile.setId(changes.profile.currentValue.id);
      
      this.specialistProfileForm.controls['name'].setValue(changes.profile.currentValue.name);
      this.specialistProfileForm.controls['last_name'].setValue(changes.profile.currentValue.last_name);
      this.specialistProfileForm.controls['age'].setValue(changes.profile.currentValue.age);
      this.specialistProfileForm.controls['id_number'].setValue(changes.profile.currentValue.id_number);
      this.specialistProfileForm.controls['user_email'].setValue(changes.profile.currentValue.user_email);

    }

  }

  getSanitizedSrc(src: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl( 'data:image/jpg;base64,' + src );
  }

  uploadNewProfileImage(event: any) {

    this.convertFile(event.target.files[0]).subscribe(
      
      (base64: any) => {
        this.profileImages.images[0] = base64;
        console.log(base64);
        this.imagesService.updateDocument(this.profileImages.id, this.profileImages).catch(
          (err) => {this.uploadImageErrorOcurred = true; console.dir(err)}
        )
      }
      
    );
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      if (event && event.target && event.target.result) {
        result.next(btoa(event.target.result.toString()));
      }
    }
    return result;
  }

  disableFields() {
    this.specialistProfileForm.controls['name'].disable();
    this.specialistProfileForm.controls['last_name'].disable();
    this.specialistProfileForm.controls['age'].disable();
    this.specialistProfileForm.controls['id_number'].disable();
    this.specialistProfileForm.controls['user_email'].disable();
  }

  editFieldRequest(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    editBtn.style.display = "none";
    confirmBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";

    this.specialistProfileForm.controls[fieldName].enable();

  }

  cancel(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    editBtn.style.display = "inline-block";
    confirmBtn.style.display = "none";
    cancelBtn.style.display = "none";

    this.specialistProfileForm.controls[fieldName].disable();

  }

  update(editBtn: any, confirmBtn: any, cancelBtn: any, fieldName: string) {

    if ( this.specialistProfileForm.controls[fieldName].valid ) {

      type ProfileKey = keyof typeof this.profile;
      const propertyName = fieldName as ProfileKey;

      this.profile[propertyName] = this.specialistProfileForm.controls[fieldName].value as never;
      console.dir(this.profile);
      this.profiles.updateDocument(this.profile.id, this.profile.getLiteralObjectRepresentation()).then(
        () => {
          editBtn.style.display = "inline-block";
          confirmBtn.style.display = "none";
          cancelBtn.style.display = "none";
          this.specialistProfileForm.controls[fieldName].disable();
        }
      ).catch(
        (err) => console.dir(err)
      )
      
    }

  }


}
