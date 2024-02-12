import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartDropdownComponent } from './shopping-cart-dropdown.component';

describe('ShoppingCartDropdownComponent', () => {
  let component: ShoppingCartDropdownComponent;
  let fixture: ComponentFixture<ShoppingCartDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
