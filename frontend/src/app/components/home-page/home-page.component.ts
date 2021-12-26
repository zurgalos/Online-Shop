

import { ProductsService } from './../../services/products.service';
import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user-model';
import { AuthState } from 'src/app/redux/auth/auth-types';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from "../dialog/dialog.component";
import { CartService } from "src/app/services/cart.service";
import { CartModel } from "src/app/models/cart-model";
import { OrdersService } from 'src/app/services/orders.service';
import { OrderModel } from 'src/app/models/order-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  totalAmountOfProducts: number;
  totalAmountOfOrders: number;
  totalCartPrice: number;
  userIsAuthenticated: boolean;
  user: UserModel;
  storeSub: Subscription;
  cartSub: Subscription;
  cart: CartModel;
  totalCartPriceSub: Subscription;
  getTotalAmountOfProductsSub: Subscription;
  getTotalAmountOfOrdersSub: any;
  getLastOrderSub: Subscription;
  lastOrder: OrderModel;


  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService,private orderService: OrdersService, public dialog: MatDialog,  private store: Store<{ auth: AuthState }>) {
  }

  ngOnInit() {
    this.getTotalAmountOfProductsSub = this.productsService.getTotalAmountOfProducts().subscribe(totalProducts => this.totalAmountOfProducts = totalProducts)
    this.getTotalAmountOfOrdersSub = this.orderService.getTotalAmountOfOrders().subscribe(totalOrders => this.totalAmountOfOrders = totalOrders);
    this.authService.setRoute("/");
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.userIsAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
      if (this.userIsAuthenticated) {
        this.cartService.getActiveCart();
        this.getLastOrderSub = this.orderService.getLastOrder().subscribe(order => {
          this.lastOrder = order;
        });
        this.totalCartPriceSub = this.cartService.getCartTotalPriceListener().subscribe(cartTotalPrice => {
          this.totalCartPrice = cartTotalPrice;
        })
        this.cartSub = this.cartService.getCartListener().subscribe(cart => {
          if (cart) {
            this.cart = cart
          }
        });
      }
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'dialog',
      height:"400px",
      width:"350px"
    });
  }


  ngOnDestroy() {

     this.getTotalAmountOfProductsSub.unsubscribe();
    this.getTotalAmountOfOrdersSub.unsubscribe();
    this.storeSub.unsubscribe();

    if (this.getLastOrderSub) {
      this.getLastOrderSub.unsubscribe();
    }
    if (this.totalCartPriceSub) {
      this.totalCartPriceSub.unsubscribe();

    }
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }
}
