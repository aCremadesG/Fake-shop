import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  
  constructor(
    private router: Router
    ) {}

  @Input() product = {} as Product;

  productDetail(id: number){
    this.router.navigate([`product`],{
      queryParams: {id: id}
    })
  }
}
