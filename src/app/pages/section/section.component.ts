import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ){}

  category = {} as Category;
  products = [] as Product[];

  ngOnInit(): void {
    this.getQueryParams();
  }
  
  getQueryParams(){
    this.activatedRoute.queryParams.subscribe((res) => {
      const queryKeys = Object.keys(res);
      let queriesString : string = '';
      queryKeys.map((key, i) =>{
        if(i > 0){
          queriesString += `&`;
        }
        queriesString += `${key}=${res[key]}`
      })
      this.getFilteredProducts(queriesString);
    })
  }

  getFilteredProducts(filter: string){
    this.productsService.filterProducts(filter).subscribe((newProducts) => {
      this.products = newProducts;
    })
  }
}
