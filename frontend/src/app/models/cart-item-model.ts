import { ProductModel } from './product-model';
export class CartItemModel {
    public constructor(
        public _id?: string,
        public product?: ProductModel,
        public totalPrice?: number,
        public amount?: number
    ) { }
}
