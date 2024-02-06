import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: [
    './product-management.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css'
  ]
})

export class ProductManagementComponent {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('data:image/')){
      return false;
    }
    return true;
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error(error)
      }
    });
  }
}
