import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  base64FirstImage: string = '';
  newUserForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.compose([])),
      last_name: new FormControl('', Validators.compose([])),
      age: new FormControl(0, Validators.compose([])),
      id_number: new FormControl('', Validators.compose([])),
      first_profile_image: new FormControl('', Validators.compose([])),
      email: new FormControl('', Validators.compose([])),
      password: new FormControl('', Validators.compose([])),
      password_control: new FormControl('', Validators.compose([])),
    }
  );

  constructor(private register: RegisterService, private profiles: ProfileService, private profileImages: ProfileImagesService) { }

  ngOnInit(): void {
  }

  submit() {
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
    )
  }

  firstImageSubmitted(event: any) {
    this.convertFile(event.target.files[0]).subscribe((base64: any) => {
      this.base64FirstImage = base64;
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

  exit() {
    this.exitEmitter.emit();
  }

}
