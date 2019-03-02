import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BannerComponent } from './banner/banner.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { OffersComponent } from './offers/offers.component';
import { CategoriesComponent } from './categories/categories.component';
import { JwtInterceptor } from './_helpers/jwt.incterceptor';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ScopeGuard } from './_guards/scope.guard';
import { CategoryCardComponent } from './categories/category-card/category-card.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CreateOfferComponent } from './offers/create-offer/create-offer.component';
import { OfferCardComponent } from './offers/offer-card/offer-card.component';
import { MatButtonModule } from '@angular/material';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FooterComponent } from './footer/footer.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LoaderComponent } from './loader/loader.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    BannerComponent,
    OffersComponent,
    CategoriesComponent,
    AlertComponent,
    CategoryCardComponent,
    CategoryCreateComponent,
    CreateOfferComponent,
    OfferCardComponent,
    AdminPanelComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [''],
        blacklistedRoutes: ['']
      }
    }),
    MatButtonModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    ScopeGuard,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoaderComponent
  ]
})
export class AppModule { }
