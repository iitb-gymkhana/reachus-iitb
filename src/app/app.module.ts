import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BannerComponent } from './banner/banner.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomsComponent } from './rooms/rooms.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    NavbarComponent,
    SignupComponent,
    BannerComponent,
    BookingsComponent,
    RoomsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
