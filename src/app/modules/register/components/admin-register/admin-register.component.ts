import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { ProfileImages } from 'src/app/models/profile-images';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  @Output('onExit') exitEmitter: EventEmitter<void> = new EventEmitter<void>();

  passwordsDontMatch: boolean = false;

  base64FirstImage: string = '';
  newUserForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      age: new FormControl(0, Validators.compose([Validators.required, Validators.min(1), Validators.max(120), Validators.pattern(/^\d+$/)])),
      id_number: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/[0-9]{1,3}\.[0-9]{3}\.[0-9]{3}/)])),
      first_profile_image: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      password_control: new FormControl('', Validators.compose([Validators.required])),
    }
  );

  constructor(private register: RegisterService, private profiles: ProfileService, private profileImages: ProfileImagesService) { }

  ngOnInit(): void {
  }

  submit() {

    if(this.newUserForm.get("password")?.value == this.newUserForm.get("password_control")?.value) {

      if (this.newUserForm.valid) {

        this.register.NewUser(
          this.newUserForm.get("email")?.value, this.newUserForm.get("password")?.value 
        ).then(
        async () => {

            let user_id = await this.register.GetNewUserID();

            this.profiles.addDocument(
              new Profile(
                user_id, 
                this.newUserForm.get("name")?.value,
                this.newUserForm.get("last_name")?.value,
                this.newUserForm.get("age")?.value,
                this.newUserForm.get("id_number")?.value,
                this.newUserForm.get("email")?.value,
                2
              ).getLiteralObjectRepresentation()
            );

            this.profileImages.addDocument(
              new ProfileImages(
                user_id,
                [
                  this.base64FirstImage
                ]
              ).getLiteralObjectRepresentation()
            );

            this.register.VerifyUser();

            this.exit();

          }
        );

      } else {
        this.newUserForm.markAllAsTouched();
      }

    } else {
      this.passwordsDontMatch = true;
      this.newUserForm.markAllAsTouched();
    }

  }

  password_matches(password_control: string) {
    return (control: AbstractControl) => ( control.value != password_control ? {'passwords_match': true} : null );
  }

  firstImageSubmitted(event: any) {
    this.convertFile(event.target.files[0]).subscribe((base64: any) => {
      this.base64FirstImage = base64;
      this.newUserForm.get('first_profile_image')?.setValue("ok");
    });
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

  allHasBeenTouched() {

    return this.newUserForm.get('name')?.touched 
    && this.newUserForm.get('last_name')?.touched 
    && this.newUserForm.get('age')?.touched 
    && this.newUserForm.get('id_number')?.touched 
    && this.newUserForm.get('first_profile_image')?.touched
    && this.newUserForm.get('email')?.touched
    && this.newUserForm.get('password')?.touched
    && this.newUserForm.get('password_control')?.touched
   
  }

  clearForm() {
    this.newUserForm.get('name')?.setValue(""); 
    this.newUserForm.get('last_name')?.setValue(""); 
    this.newUserForm.get('age')?.setValue(""); 
    this.newUserForm.get('id_number')?.setValue(""); 
    this.newUserForm.get('first_profile_image')?.setValue("");
    this.newUserForm.get('email')?.setValue("");
    this.newUserForm.get('password')?.setValue("");
    this.newUserForm.get('password_control')?.setValue("");
  }

  exit() {
    this.exitEmitter.emit();
  }

}
