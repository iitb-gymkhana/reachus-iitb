import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { environment } from '../../environments/environment';
import { AlertService } from '../_services/alert.service';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUrl = environment.loginUrl;
  categories: any = [];

  constructor(
    public authService: AuthService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (res) => this.categories = res,
      (err) => this.alertService.error(err)
    );
  }
}
