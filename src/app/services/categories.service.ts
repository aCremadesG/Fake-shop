import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Category } from '../interfaces/category';
import { NewCategory } from '../interfaces/new-category';
import { Product } from '../interfaces/product';
import { CategoriesErrorHandler } from '../classes/categories-error-handler';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = environment.apiUrl
  private categoriesErrorHandler: CategoriesErrorHandler = new CategoriesErrorHandler();
  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }

  getCategory(idCategory: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}categories/${idCategory}`).pipe(catchError(this.categoriesErrorHandler.handleError));
  }

  createCategory(category: NewCategory): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}categories/`, category);
  }

  updateCategory(idCategory: string, category: NewCategory): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}categories/${idCategory}`, category);
  }

  deleteCategory(idCategory: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}categories/${idCategory}`);
  }

  getProductsByCategory(idCategory: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}categories/${idCategory}/products`);
  }
}
