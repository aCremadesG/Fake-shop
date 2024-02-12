import { BuyProduct } from "../interfaces/buy-product";

export class Cart {
    items:BuyProduct[] = [];

    get totalPrice(): number{
        let totalPrice = 0;
        this.items.map(item => {
            totalPrice += item.amount * item.product.price
        })
        return totalPrice;
    }
}
