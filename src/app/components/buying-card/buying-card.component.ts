import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyProduct } from 'src/app/interfaces/buy-product';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-buying-card',
  templateUrl: './buying-card.component.html',
  styleUrls: ['./buying-card.component.scss']
})
export class BuyingCardComponent {

  constructor(
    private cartService: CartService
  ){}

  //productAmount: number = 1;

  productForm = new FormGroup({
    amount: new FormControl(1, [
      Validators.required
    ])
  });
  @Input() product = {} as Product;

  onSubmit(){
    let buyingProduct = {} as BuyProduct;
    if(this.productForm.value.amount) {
      buyingProduct.amount = Number(this.productForm.value.amount)
      buyingProduct.product = this.product;
      this.cartService.addToCart(buyingProduct);
    };
  }

  addAmount(){
    if(this.productForm.value.amount){
      if(this.productForm.value.amount < 10){
        this.setAmount(this.productForm.value.amount + 1);
        this.productForm.value.amount
      }
      return;
    }
    this.setAmount(1);
  }

  subAmount(){
    if(this.productForm.value.amount){
      if(this.productForm.value.amount > 1){
        this.setAmount(this.productForm.value.amount - 1);
        this.productForm.value.amount
      }
      return;
    }
  }

  setAmount(value: number){
    this.productForm.value.amount = value
  }
}
