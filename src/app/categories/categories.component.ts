import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../_services/category.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  tab = 0;

  public deleteCategoryFromArr(uniqueIdentifier) {
    this.categories = this.categories.filter(x => x.uniqueIdentifier !== uniqueIdentifier);
  }

  public fetchAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe(
      (res) => this.categories = res,
      (err) => this.alertService.error(err)
    );
  }

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchAllCategories();
  }

}
