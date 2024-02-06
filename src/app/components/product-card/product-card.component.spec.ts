import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let expectedProduct = {"id":1,"title":"Majestic Mountain Graphic T-Shirt","price":44,"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.","images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = expectedProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
