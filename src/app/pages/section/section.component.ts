import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError, switchMap} from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ErrorAlertService } from 'src/app/services/error-alert.service';
import { ProductsService } from 'src/app/services/products.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    private categoriesService: CategoriesService,
    private errorAlertService: ErrorAlertService,
  ){}

  category = {} as Category;
  products = [] as Product[];
  errorMessage: string = '';

  ngOnInit(): void {
    this.spinnerService.callSpinner();
    this.getQueryParams();
  }
  
  getQueryParams(){
    this.activatedRoute.queryParams.subscribe(
      res => {
      const queryKeys = Object.keys(res);
      let queriesString : string = '';
      let category : string = '';
      queryKeys.map((key, i) =>{
        if(i > 0){
          queriesString += `&`;
        }
        if(key === 'categoryId'){
          category = res[key];
        }
        queriesString += `${key}=${res[key]}`
      })
      if(category !== ''){
        this.checkCategoryExists(category, queriesString)
        return;
      }
      this.getFilteredProducts(queriesString);
    })
  }

  checkCategoryExists(category: string, filter: string){
    this.categoriesService.getCategory(category).pipe(
      catchError(err => {
        this.errorAlertService.sendData(err);
        this.spinnerService.stopSpinnerService();
        return EMPTY;
      })
    ).subscribe(
      res => {
        this.category = res;
        this.getFilteredProducts(filter)
      }
    )
  }

  getFilteredProducts(filter: string){
    this.productsService.filterProducts(filter).pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    ).subscribe(
      res => {
        this.products = res;
        this.spinnerService.stopSpinnerService();
    })
  }
}
