import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SectionComponent } from './section.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  let categoriesServiceStub: any;
  let productsServiceStub: any;
  const mockActivatedRoute = {
    queryParams: of({categoryId: 1})
  };

  const responseAllCategories:Category[] = [
    {"id":1,"name":"Chlothes","image":"https://i.imgur.com/QkIa5tT.jpeg",},
    {"id":2,"name":"Electronics","image":"https://i.imgur.com/ZANVnHE.jpeg"},
    {"id":3,"name":"Furniture","image":"https://i.imgur.com/Qphac99.jpeg"},
    {"id":4,"name":"Shoe","image":"https://i.imgur.com/qNOjJje.jpeg"},
  ];
  
  const responsePaginatedProducts: Product[] = [
    {"id":1,"title":"Majestic Mountain Graphic T-Shirt","price":44,"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.","images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}},
    {"id":2,"title":"Classic Red Pullover Hoodie","price":10,"description":"Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.","images":["https://i.imgur.com/1twoaDy.jpeg","https://i.imgur.com/FDwQgLy.jpeg","https://i.imgur.com/kg1ZhhH.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}},
    {"id":3,"title":"Classic Heather Gray Hoodie","price":69,"description":"Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.","images":["https://i.imgur.com/cHddUCu.jpeg","https://i.imgur.com/CFOjAgK.jpeg","https://i.imgur.com/wbIMMme.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}},
    {"id":4,"title":"Classic Grey Hooded Sweatshirt","price":90,"description":"Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.","images":["https://i.imgur.com/R2PN9Wq.jpeg","https://i.imgur.com/IvxMPFr.jpeg","https://i.imgur.com/7eW9nXP.jpeg"],"category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg"}}
  ];

  beforeEach(async () => {
    categoriesServiceStub = {
      getAllCategories(): Observable<Category[]>{
        return of(responseAllCategories);
      }
    }
    productsServiceStub = {
      paginateProducts(): Observable<Product[]>{
        return of(responsePaginatedProducts);
      }
    }
    await TestBed.configureTestingModule({
      declarations: [ SectionComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: CategoriesService, useValue: categoriesServiceStub},
        {provide: ProductsService, useValue: productsServiceStub},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
