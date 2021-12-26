import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './redux/auth/auth-reducer';
import { AuthInterceptorService } from './helpers/auth-interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './redux/auth/auth-effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsTabsComponent } from './components/products-tab/products-tab.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { PdfReceiptComponent } from './components/pdf-receipt/pdf-receipt.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DialogComponent,
    NavbarComponent,
    ProductsTabsComponent,
    RegisterComponent,
    ShopComponent,
    CartDialogComponent,
    AdminShopComponent,
    EditProductDialogComponent,
    CheckoutComponent,
    OrderFormComponent,
    OrderDialogComponent,
    PdfReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer}),
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSelectModule,
    MatSidenavModule,
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
