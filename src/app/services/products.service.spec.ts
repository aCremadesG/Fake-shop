import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController
  let apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const testData = [
      {"id":1,"title":"Majestic Mountain Graphic T-Shirt","price":44,"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.","images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}}
    ] as Product []
    httpClient.get<Product[]>(`${apiUrl}products`).subscribe(data =>{
      expect(data).toEqual(testData)
    })
    const req = httpTestingController.expectOne(`${apiUrl}products`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('should get one product', () => {
    let idProduct = 1;
    const testData = {"id":1,"title":"Majestic Mountain Graphic T-Shirt","price":44,"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.","images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}} as Product;
    httpClient.get<Product>(`${apiUrl}products/${idProduct}`).subscribe(data =>{
      expect(data).toEqual(testData)
      expect(data.id).toEqual(idProduct)
    })
    const req = httpTestingController.expectOne(`${apiUrl}products/${idProduct}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  /*it(`should'nt return any product`, () => {
    let idProduct = 1;
    const testData = ;
    httpClient.get<Product>(`${apiUrl}products/${idProduct}`).subscribe(data =>{
      expect(data).toEqual(testData)
      expect(data.id).toEqual(idProduct)
    })
    const req = httpTestingController.expectOne(`${apiUrl}products/${99}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  })*/

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify;
  })
});
