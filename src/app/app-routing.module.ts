import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { OffersComponent } from './offers/offers.component';
import { CategoriesComponent } from './categories/categories.component';
import { ScopeGuard } from './_guards/scope.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { 
    path: '', 
    component: CalendarComponent,
    data: {
      title: 'Home',
      metatags: {
        desciption: 'Reachus Portal',
        keywords: 'reachus, iitb'
      }
    }
  
  },
  { 
    path: 'login', 
    component: LoginComponent,
    data: {
      title: 'Login',
      metatags: {
        desciption: 'Reachus Portal',
        keywords: 'reachus, iitb'
      }
    } 
  },
  { 
    path: 'offers', 
    component: OffersComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Offers',
      metatags: {
        desciption: 'Reachus Portal',
        keywords: 'reachus, iitb'
      }
    }
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [ScopeGuard],
    data: {
      expectedRole: 'admin',
      title: 'Categories',
      metatags: {
        desciption: 'Reachus Portal',
        keywords: 'reachus, iitb'
      }
    }
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [ScopeGuard],
    data: {
      expectedRole: 'admin',
      title: 'Admin Panel',
      metatags: {
        desciption: 'Reachus Portal',
        keywords: 'reachus, iitb'
      }
    }
  },
  { path: '**', redirectTo: '' }
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
