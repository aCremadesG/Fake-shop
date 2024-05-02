import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Carrousel } from 'src/app/interfaces/carrousel';
import { Product } from 'src/app/interfaces/product';
import { ErrorAlertService } from 'src/app/services/error-alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private errorAlertService: ErrorAlertService
  ){}

  product = {} as Product;
  carrouselData = {empty: true} as Carrousel;

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
    this.productService.getProduct(id).pipe(
      catchError(err => {
        this.errorAlertService.sendData(err);
        //Lanzar el toast con el error y redirigir al usuario a la home.
        return EMPTY;
      })
    ).subscribe((newProduct) => {
      this.product = newProduct
      this.carrouselData.images = newProduct.images;
      this.carrouselData.type = "product"
      this.carrouselData.empty = false;
    })
  }
}
