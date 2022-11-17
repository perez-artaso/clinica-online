import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, Event as NavigationEvent , NavigationStart, NavigationEnd } from '@angular/router';
import { LoginErrors } from 'src/app/models/login-errors';
import { ProfileService } from 'src/app/services/profile.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Profile } from 'src/app/models/profile';
import { ProfileImagesService } from 'src/app/services/profile-images.service';
import { ProfileImages } from 'src/app/models/profile-images';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs';
import { LoginLogsService } from 'src/app/services/login-log.service';
import { LoginLog } from 'src/app/models/login-log';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  _email: string = "";
  _password: string = "";

  _revealQuickAccess: boolean = false;

  quickAccessButtons: Array<Profile> = [];
  quickAccessImages: Array<ProfileImages> = [];

  errors: LoginErrors = new LoginErrors();

  @Output('registerRequest') registerEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private profileService: ProfileService, 
    private navBarService: NavbarService, 
    private loadingService: LoadingService, 
    public profileImages: ProfileImagesService,
    private loginLogService: LoginLogsService
  ) { }

  ngOnInit(): void {

    this.initLoadingIndicator();

    if(this.auth.IsUserLoggedIn()) this.router.navigate(['/home']);

    this.profileService.getAdminProfiles().pipe(first()).subscribe(
      (s: Array<any>) => {
        this.quickAccessButtons[0] = s[0];
      }
    );

    this.profileService.getSpecialistsProfiles().pipe(first()).subscribe(
      (s: Array<any>) => {
        this.quickAccessButtons[1] = s[0];
        this.quickAccessButtons[2] = s[1];
      }
    );

    this.profileService.getPatientProfiles().pipe(first()).subscribe(
      (s: Array<any>) => {
        this.quickAccessButtons[3] = s[0];
        this.quickAccessButtons[4] = s[1];
        this.quickAccessButtons[5] = s[2];
        this.setQuickAccessImages();
      }
    );

  }
  

  login() {
    this.loadingService.loadingStart();
    this.auth.Login(this._email, this._password).then(
     (res) => {
        if ( res.user != null ) {
          if (res.user.emailVerified) {
            this.auth.SetCurrentUser(res.user);
            let user_id = this.auth.GetCurrentUserID();
            
            if(user_id){

              this.profileService.getProfileByUID(user_id).pipe(first()).subscribe(
                async (res: any) => {

                  if ( res[0].approved != undefined && user_id ) {

                    if (res[0].approved == 1) {

                      this.router.navigate(["/home"]);
                      this.navBarService.showNavbar();

                      this.loginLogService.addDocument(
                        new LoginLog(user_id, Date.now().toString()).getLiteralObjectRepresentation()
                      );

                    } else {

                      this.loadingService.loadingEnd();
                      this.errors.SPECIALIST_NOT_APPROVED.ocurred = true;

                    }

                  } else {

                    this.router.navigate(["/home"]);
                    this.navBarService.showNavbar();

                    this.loginLogService.addDocument(
                      new LoginLog((user_id as string), Date.now().toString()).getLiteralObjectRepresentation()
                    );

                  }

                } 
              );        

            }
          } else {
            this.loadingService.loadingEnd();
            this.errors.EMAIL_NOT_VERIFIED.ocurred = true;
          }
        }

      }
    ).catch(

      (err) => {

        this.loadingService.loadingEnd();
        
        this.errors.ClearErrors();

        if ( this.RequiredFieldsFilled() ) {
          
          if (err.code == "auth/invalid-email") {

            this.errors.INVALID_EMAIL.ocurred = true;
  
          } else if (err.code == "auth/wrong-password") {
  
            this.errors.WRONG_PASSWORD.ocurred = true;
  
          }else if (err.code == "auth/user-not-found") {
  
            this.errors.USER_NOT_FOUND.ocurred = true;
  
          } else {
  
            this.errors.OTHER.message = err.message;
            this.errors.OTHER.ocurred = true;            
  
          }
        }
        
      }
      
    );
  }

  RequiredFieldsFilled(): boolean {

    if (this._email == "") {
      this.errors.EMAIL_REQUIRED.ocurred = true;
      return false;
    } else if (this._password == "") {
      this.errors.PASSWORD_REQUIRED.ocurred = true;
      return false;
    }

    return true;

  }

  registerRequest() {
    this.registerEmitter.emit();
  }

  initLoadingIndicator() {

    this.router.events.subscribe(

      (event: NavigationEvent) => {

        if(event instanceof NavigationStart) {
          this.loadingService.loadingStart();
        } else if (event instanceof NavigationEnd) {
          this.loadingService.loadingEnd();
        }

      }
      
    );

  }


  toggleQuickAccessOptions() {
    this._revealQuickAccess = !this._revealQuickAccess;
  }

  setQuickAccessImages() {

    this.quickAccessImages = new Array<ProfileImages>();

    this.quickAccessButtons.forEach(
      (profile: Profile) => {
        this.profileImages.getImagesByUID(profile.uid).pipe(first()).subscribe(
          (images: ProfileImages[]) => this.quickAccessImages.push(images[0])
        );
      }
    );

  }

  getBase64ProfileImageByUid(uid: string): ProfileImages {
    return this.quickAccessImages.filter( pImage => pImage.uid == uid )[0];
  }

  setImageUrl(role: number) {

    if (role == 0) {

      return "assets/paciente.png";

    } else if (role == 1) {

      return "assets/especialista.png";

    } else {

      return "assets/administrador.png";
      
    }

  }

  badgeClicked(profile: Profile) {
    
    this._email = profile.user_email;
    
    this._password = environment.quickAccessUsers.filter(
      u => u.email == profile.user_email
    )[0].password;
    
  }


}
