import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "../../src/app/components/home-page/home-page.component"
import { AuthGuard } from './helpers/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';
import { AdminAuthGuard } from './helpers/auth-admin.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent, pathMatch: "full" },
  { path: 'register', component: RegisterComponent, pathMatch: "full" },
  { path: 'shop', component: ShopComponent, pathMatch: "full", canActivate: [AuthGuard], },
  { path: 'checkout', component: CheckoutComponent, pathMatch: "full", canActivate: [AuthGuard], },
  { path: 'admin-shop', component: AdminShopComponent, pathMatch: "full", canActivate: [AdminAuthGuard], },
  { path: "", pathMatch: "full", redirectTo: "/home" }, 
  { path: "**", redirectTo: "/home" } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
