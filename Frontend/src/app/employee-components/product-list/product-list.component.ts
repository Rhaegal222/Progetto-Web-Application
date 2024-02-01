import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css',
    '../../styles/container.css',
  ]
})
export class ProductListComponent {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  /*
  ngOnInit(): void {
    // get all products in a json array
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  */
}
