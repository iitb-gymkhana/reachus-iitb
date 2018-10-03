import { Component } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { SEOService } from './_services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loader = LoaderComponent;

  constructor(
    private seoService: SEOService
  ) {
    seoService.addSeoData();
  }
}
