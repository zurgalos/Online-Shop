import { CartItemModel } from './cart-item-model';
export class CartModel {
    public constructor(
        public isActive: true,
        public _id: string,
        public cartItems: [CartItemModel],
        public client: string,
        public createdAt: string
    ) { }
}
