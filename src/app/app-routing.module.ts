import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { OffersComponent } from './offers/offers.component';
import { CategoriesComponent } from './categories/categories.component';
import { ScopeGuard } from './_guards/scope.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoryOffersComponent } from './offers/category-offers/category-offers.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: {
      title: 'Home',
      metatags: {
        desciption: 'ReachUs Portal',
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
        desciption: 'ReachUs Portal',
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
        desciption: 'ReachUs Portal',
        keywords: 'reachus, iitb'
      }
    }
  },
  {
    path: 'offers/:category', 
    component: CategoryOffersComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Offers',
      metatags: {
        desciption: 'ReachUs Portal',
        keywords: 'reachus, iitb'
      }
    }
  },
  {
    path: 'offers/edit/:id', 
    component: EditOfferComponent, 
    canActivate: [AuthGuard],
    data: {
      title: 'Edit Offer',
      metatags: {
        desciption: 'ReachUs Portal',
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
        desciption: 'ReachUs Portal',
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
        desciption: 'ReachUs Portal',
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
