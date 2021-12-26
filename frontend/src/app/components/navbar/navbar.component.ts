import { AuthState } from './../../redux/auth/auth-types';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LogoutUser } from 'src/app/redux/auth/auth-actions-types';
import { CartService } from 'src/app/services/cart.service';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  storeSub: Subscription;
  cartSub: Subscription;
  totalProductsSum: number;
  getRouteListenerSub: Subscription;
  userIsAuthenticated = false;
  currentRoute = "/";
  user = null as any;

  constructor(private cartService: CartService, private authService: AuthService, public dialog: MatDialog, private store: Store<{ auth: AuthState }>) { }

  ngOnInit() {

    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.userIsAuthenticated = authState.isAuthenticated;
      this.user = authState.user;
    });
    this.getRouteListenerSub = this.authService.getRouteListener().subscribe(route => {
      this.currentRoute = route;
    });
    this.cartSub = this.cartService.getSumOfProductsListener().subscribe(totalProductsSum => {
      this.totalProductsSum = totalProductsSum;
    })


  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'dialog',
      height:"400px",
      width:"350px"
    });
  }
  openCartDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      panelClass: 'cart-dialog'
    });
  }

  ngOnDestroy() {
    this.getRouteListenerSub.unsubscribe();
    this.storeSub.unsubscribe();
    this.cartSub.unsubscribe();
  }

}
