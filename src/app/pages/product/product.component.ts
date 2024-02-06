import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ){}

  product = {} as Product;

  ngOnInit(): void {
    this.getQueryParams()
  }

  getQueryParams(){
    this.activatedRoute.queryParams.subscribe((res) => {
      const queryKeys = Object.keys(res);
      const IDproduct = res['id'];
      this.getProduct(IDproduct);
    })
  }

  getProduct(id: string){
    this.productService.getProduct(id).subscribe((newProduct) => {
      this.product = newProduct
    })
  }
}
