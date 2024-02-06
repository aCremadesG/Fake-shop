import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { Category } from 'src/app/interfaces/category';
import { Observable, of } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let categoriesServiceStub: any;
  const responseAllCategories:Category[] = [
    {"id":1,"name":"Chlothes","image":"https://i.imgur.com/QkIa5tT.jpeg",},
    {"id":2,"name":"Electronics","image":"https://i.imgur.com/ZANVnHE.jpeg"},
    {"id":3,"name":"Furniture","image":"https://i.imgur.com/Qphac99.jpeg"},
    {"id":4,"name":"Shoe","image":"https://i.imgur.com/qNOjJje.jpeg"},
  ];
  beforeEach(async () => {
    categoriesServiceStub = {
      getAllCategories(): Observable<Category[]>{
        return of(responseAllCategories);
      }
    }
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [ 
        {provide: CategoriesService, useValue: categoriesServiceStub},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
