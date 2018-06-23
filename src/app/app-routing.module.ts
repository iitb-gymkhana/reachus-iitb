import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { BookingsComponent } from './bookings/bookings.component';
import { RoomsComponent } from './rooms/rooms.component';

const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard]},
  { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
