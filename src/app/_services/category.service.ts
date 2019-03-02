import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Category } from '../category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  apiBaseUrl = environment.apiBaseUrl;

  public createCategory(category: Category) {
    return this.http.post(
      `${this.apiBaseUrl}/categories`,
      category);
  }

  public getAllCategories() {
    return this.http.get<[Category]>(
      `${this.apiBaseUrl}/categories`,
    );
  }

  public deleteCategory(number) {
    return this.http.delete<{ message: string }>(
      `${this.apiBaseUrl}/categories/${number}`
    );
  }

  public updateCategory(category) {
    return this.http.put<{ message: string }>(
      `${this.apiBaseUrl}/categories`, category);
  }
}
