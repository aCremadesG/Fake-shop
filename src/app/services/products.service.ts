import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Product } from '../interfaces/product';
import { NewProduct } from '../interfaces/new-product';
import { ProductsErrorHandler } from '../classes/products-error-handler';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.apiUrl;
  private productsErrorHandler: ProductsErrorHandler = new ProductsErrorHandler();
  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`).pipe(catchError(this.productsErrorHandler.handleError));
  }

  getProduct(idProduct: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${idProduct}`).pipe(catchError(this.productsErrorHandler.handleError));
  }

  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products/`, product).pipe(catchError(this.productsErrorHandler.handleError));
  }

  updateProduct(idProduct: string, product: NewProduct): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}products/${idProduct}`, product).pipe(catchError(this.productsErrorHandler.handleError));
  }

  deleteProduct(idProduct: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}products/${idProduct}`).pipe(catchError(this.productsErrorHandler.handleError));
  }

  paginateProducts(set: number, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products?offset=${set}&limit=${limit}`).pipe(catchError(this.productsErrorHandler.handleError));
  }

  filterProducts(filters: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}products/?${filters}`).pipe(catchError(this.productsErrorHandler.handleError));
  }
}
