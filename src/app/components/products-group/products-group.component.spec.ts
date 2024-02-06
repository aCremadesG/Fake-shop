import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsGroupComponent } from './products-group.component';

describe('ProductsGroupComponent', () => {
  let component: ProductsGroupComponent;
  let fixture: ComponentFixture<ProductsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
