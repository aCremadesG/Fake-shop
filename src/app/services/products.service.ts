import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { NewProduct } from '../interfaces/new-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`);
  }

  getProduct(idProduct: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${idProduct}`);
  }

  createProduct(product: NewProduct): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products/`, product);
  }

  updateProduct(idProduct: string, product: NewProduct): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}products/${idProduct}`, product);
  }

  deleteProduct(idProduct: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}products/${idProduct}`);
  }

  paginateProducts(set: number, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products?offset=${set}&limit=${limit}`)
  }

  filterProducts(filters: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}products/?${filters}`);
  }
}
