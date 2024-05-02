import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGroupComponent } from './password-group.component';

describe('PasswordGroupComponent', () => {
  let component: PasswordGroupComponent;
  let fixture: ComponentFixture<PasswordGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
