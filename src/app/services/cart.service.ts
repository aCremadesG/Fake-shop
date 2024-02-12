import { Injectable } from '@angular/core';
import { Cart } from '../classes/cart';
import { BuyProduct } from '../interfaces/buy-product';
import { of } from 'rxjs'
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private localStorageService: LocalStorageService
  ){}
  private cart:Cart = new Cart();
  
  addToCart(product: BuyProduct):void{
    let cartItem = this.cart.items.find(item => item.product.id === product.product.id);
    if(cartItem){
      this.changeQuantity(product.product.id, cartItem.amount + product.amount);
      this.saveCart();
      return;
    }
    this.cart.items.push(product);
    this.saveCart();
  }

  removeFromCart(productId: number): void{
    this.cart.items = this.cart.items.filter(item => item.product.id != productId)
    this.saveCart();
  }

  changeQuantity(productId: number, amount: number){
    let cartItem = this.cart.items.find(item => item.product.id === productId);
    if(!cartItem) return;
    cartItem.amount = amount;
    this.saveCart();
  }

  getCart(){
    return of(this.cart);
  }

  loadCart(){
    const cartStorage = this.localStorageService.getItem<Cart>('cart');
    if(cartStorage!==null){
      cartStorage.items.map(item => {
        this.addToCart(item);
      })
    }
  }

  saveCart(){
    this.localStorageService.setItem('cart', this.cart);
  }
}