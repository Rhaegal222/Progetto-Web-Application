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

  
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log('There was an error!', error);
      }
    });
  }
}
