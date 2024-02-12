import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInToastComponent } from './log-in-toast.component';

describe('LogInToastComponent', () => {
  let component: LogInToastComponent;
  let fixture: ComponentFixture<LogInToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
