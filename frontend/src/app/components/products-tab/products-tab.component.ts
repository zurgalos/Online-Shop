import { ProductModel } from './../../models/product-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.css']
})
export class ProductsTabsComponent implements OnInit, OnDestroy {
  getProductsForHomepageSub: Subscription;
  products: {
    drinks: ProductModel[],
    snacks: ProductModel[],
    vegetablesAndFruits: ProductModel[],
    meatAndFish: ProductModel[]
  }

  constructor(private productsService: ProductsService) { }


  ngOnInit() {
    this.getProductsForHomepageSub = this.productsService.getProductsForHomepage().subscribe(products => {
      this.products = products;
    })

  }

  ngOnDestroy() {
    this.getProductsForHomepageSub.unsubscribe();
  }


}
