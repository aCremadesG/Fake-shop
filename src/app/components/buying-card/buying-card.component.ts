import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyProduct } from 'src/app/interfaces/buy-product';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-buying-card',
  templateUrl: './buying-card.component.html',
  styleUrls: ['./buying-card.component.scss']
})
export class BuyingCardComponent {

  productAmount: number = 1;

  productForm = new FormGroup({
    amount: new FormControl("1", [
      Validators.required,
      Validators.min(this.productAmount)
    ])
  });
  @Input() product = {} as Product;

  onSubmit(){
    let buyingProduct = {} as BuyProduct;
    if(this.productForm.value.amount) buyingProduct.amount = Number(this.productForm.value.amount);
    buyingProduct.product = this.product;

    console.log(buyingProduct);
  }

  constructor(){}
}
