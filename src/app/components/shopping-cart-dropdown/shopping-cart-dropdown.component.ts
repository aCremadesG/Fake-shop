import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/classes/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart-dropdown',
  templateUrl: './shopping-cart-dropdown.component.html',
  styleUrls: ['./shopping-cart-dropdown.component.scss']
})
export class ShoppingCartDropdownComponent implements OnInit {

  constructor(
    private cartService: CartService
  ){}

  ngOnInit(){
    this.cartService.loadCart();
    this.cartService.getCart().subscribe(data =>
      this.cart = data
      )
  }

  cart = {} as Cart;

  deleteArrayProduct(productIndex: number){
    this.cartService.removeFromCart(productIndex);
  }

  changeAmount(productIndex: number){
    let productAmount = (document.getElementById("amount") as HTMLInputElement).value;
    if(productAmount === '0'){
      this.deleteArrayProduct(productIndex);
      return;
    }
    this.cartService.changeQuantity(productIndex, Number(productAmount));
  }
}
