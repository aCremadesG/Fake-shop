import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productsServiceStub: any;
  const mockActivatedRoute = {
    queryParams: of({product: 1})
  };

  const responseGetProduct: Product = {"id":1,"title":"Majestic Mountain Graphic T-Shirt","price":44,"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.","images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}};

  beforeEach(async () => {
    productsServiceStub = {
      getProduct(): Observable<Product>{
        return of(responseGetProduct);
      }
    }
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: ProductsService, useValue: productsServiceStub},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
