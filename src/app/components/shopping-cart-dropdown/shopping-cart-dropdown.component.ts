import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/classes/cart';
import { BuyProduct } from 'src/app/interfaces/buy-product';
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
}
