import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingCardComponent } from './buying-card.component';

describe('BuyingCardComponent', () => {
  let component: BuyingCardComponent;
  let fixture: ComponentFixture<BuyingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
