import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../category';
import { CategoryService } from '../../_services/category.service';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category = new Category(null, '');

  onSubmit() {
    this.categoryService.createCategory(this.category)
      .subscribe(
        (res) => this.alertService.success(res['message']),
        (err) => this.alertService.error(err)
      );

    this.category = new Category(null, '');
  }

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

}
