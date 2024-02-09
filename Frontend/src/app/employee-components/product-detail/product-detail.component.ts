import { Component } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor() { }

  selectedProduct: Product | undefined;

  idItem: number = 0;
  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  assignedUser: string = '';
  assigned: boolean = false;  
  
  ngOnInit() {

    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct !== null && selectedProduct !== undefined) {
      this.selectedProduct = JSON.parse(selectedProduct);
      console.log(this.selectedProduct);
    }
    
  }

  requestProduct(){
    
  }

}
