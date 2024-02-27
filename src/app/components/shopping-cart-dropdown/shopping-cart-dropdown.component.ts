import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/classes/cart';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-dropdown',
  templateUrl: './shopping-cart-dropdown.component.html',
  styleUrls: ['./shopping-cart-dropdown.component.scss']
})
export class ShoppingCartDropdownComponent implements OnInit {

  private subscription: Subscription;

  constructor(
    private cartService: CartService
  ){
    this.subscription = this.cartService.getCart().subscribe(res => {
      this.cart = res;
    })
  }

  ngOnInit(){
    this.cartService.loadCart();
    // this.cartService.getCart().subscribe(data => {
    //   this.cart = data;
    //   console.log(data);
    // })
  }

  cart = {} as Cart;

  deleteArrayProduct(productIndex: number){
    this.cartService.removeFromCart(productIndex);
  }

  changeAmount(productIndex: number, arrayIndex: number){
    let productAmount = (document.getElementById(`amount${arrayIndex}`) as HTMLInputElement).value;
    if(productAmount === '0'){
      this.deleteArrayProduct(productIndex);
      return;
    }
    this.cartService.changeQuantity(productIndex, Number(productAmount));
  }
}
