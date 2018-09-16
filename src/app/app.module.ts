import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BannerComponent } from './banner/banner.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomsComponent } from './rooms/rooms.component';
import { JwtInterceptor } from './_helpers/jwt.incterceptor';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ScopeGuard } from './_guards/scope.guard';
import { RoomCardComponent } from './rooms/room-card/room-card.component';
import { RoomCreateComponent } from './rooms/room-create/room-create.component';
import { CreateBookingComponent } from './bookings/create-booking/create-booking.component';
import { BookingCardComponent } from './bookings/booking-card/booking-card.component';
import { BookingConflictModalComponent } from './bookings/booking-conflict-modal/booking-conflict-modal.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { XunkCalendarModule } from 'xunk-calendar';
import { XunkCalendarComponent } from './xunk-calendar/xunk-calendar.component';

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
    RoomsComponent,
    AlertComponent,
    RoomCardComponent,
    RoomCreateComponent,
    CreateBookingComponent,
    BookingCardComponent,
    BookingConflictModalComponent,
    XunkCalendarComponent
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
    }),
    MatButtonModule,
    MatIconModule,
    XunkCalendarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ScopeGuard,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
