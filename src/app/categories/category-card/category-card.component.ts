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
  @Output() deleteCategoryFromArr = new EventEmitter<string>();

  isEditable = false;
  categoryValueBackup: Category;

  editCategory() {
    this.isEditable = true;
    this.categoryValueBackup = new Category(this.category.uniqueIdentifier, this.category.name, this.category.thumbnail);
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.uniqueIdentifier)
      .subscribe(
        (res) => this.alertService.success(res.message),
        (err) => this.alertService.error(err)
      );

    this.deleteCategoryFromArr.emit(this.category.uniqueIdentifier);
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
    this.category.uniqueIdentifier = this.categoryValueBackup.uniqueIdentifier;
    this.category.name = this.categoryValueBackup.name;
    this.category.thumbnail = this.categoryValueBackup.thumbnail;
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
