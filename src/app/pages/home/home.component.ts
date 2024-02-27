import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { Section } from 'src/app/interfaces/section';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  section = {title: 'PRODUCT_CARD.FOR_YOU', size: 4, urlTitle: 'PRODUCT_CARD.SEE_ALL',url: '#'} as Section;
  categories = [] as Category[]
  section2 = [{title: 'Producto destacado', size: 1},{title: 'Ofertas para ti', size: 4, urlTitle: 'Ver todas las ofertas',url: '#'}] as Section[];
  //section2 will be used to create a new section system with the filterProducts.

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ){}

  ngOnInit() {
    this.productsService.paginateProducts(0,this.section.size).subscribe((_products) =>{
      this.section.products = _products;
      console.log('test');
    })
    this.categoriesService.getAllCategories().subscribe((newCategories) => {
      this.categories = newCategories;
    });
  }
}
