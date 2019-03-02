import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CategoryService } from '../../_services/category.service';
import { AlertService } from '../../_services/alert.service';
import { Category } from '../../category';
import * as $ from 'jquery';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit, AfterViewInit {
  @Input() category: Category;
  @Output() deleteCategoryFromArr = new EventEmitter<number>();

  isEditable = false;
  categoryValueBackup: Category;

  editCategory() {
    this.isEditable = true;
    this.categoryValueBackup = new Category(this.category.number, this.category.name);
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.number)
      .subscribe(
        (res) => this.alertService.success(res.message),
        (err) => this.alertService.error(err)
      );

    this.deleteCategoryFromArr.emit(this.category.number);
  }

  updateCategory() {
    this.categoryService.updateCategory(this.category)
      .subscribe(
        (res) => this.alertService.success(res.message),
        (err) => {
          this.undoCategoryEdit();
          this.alertService.error(err);
        }
      );
    this.isEditable = false;
  }

  undoCategoryEdit() {
    this.isEditable = false;
    this.category.number = this.categoryValueBackup.number;
    this.category.name = this.categoryValueBackup.name;
  }

  constructor(
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
