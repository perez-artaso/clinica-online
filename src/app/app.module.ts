import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RandomBgImageDirective } from './directives/random-bg-image.directive';

import { RegisterModule } from './modules/register/register.module';
import { BadgeComponent } from './components/badge/badge.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HomeComponent } from './pages/home/home.component';
import { MmsDirective } from './directives/mms.directive';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { ClickableDirective } from './directives/clickable.directive';
import { ToLocaleDatePipe } from './pipes/to-locale-date.pipe';
import { ToLocaleTimePipe } from './pipes/to-locale-time.pipe';
import { AdminMessagePipe } from './pipes/admin-message.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginFormComponent,
    WelcomeComponent,
    RandomBgImageDirective,
    BadgeComponent,
    LoadingComponent,
    HomeComponent,
    MmsDirective,
    CaptchaComponent,
    ClickableDirective,
    ToLocaleDatePipe,
    ToLocaleTimePipe,
    AdminMessagePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RegisterModule,
    BrowserAnimationsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
