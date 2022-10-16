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

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginFormComponent,
    WelcomeComponent,
    RandomBgImageDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
