import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { User } from '../../model/user';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [
    './product-detail.component.css',
    '../../styles/buttons.css'
  ]
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
  assignedUser: User | undefined | string;
  assigned: boolean = false;  
  
  ngOnInit() {

    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct !== null && selectedProduct !== undefined) {
      this.selectedProduct = JSON.parse(selectedProduct);

      if(this.selectedProduct != null && this.selectedProduct != undefined){
        if(this.selectedProduct.idItem != null && this.selectedProduct.idItem != undefined && this.selectedProduct.idItem != 0)
          this.idItem = this.selectedProduct.idItem;
        this.name = this.selectedProduct?.name;
        this.type = this.selectedProduct?.type;
        if(this.selectedProduct?.description != null && this.selectedProduct?.description != undefined && this.selectedProduct?.description != "")
          this.description = this.selectedProduct?.description;
        if(this.selectedProduct?.location != null && this.selectedProduct?.location != undefined && this.selectedProduct?.location != "")
          this.location = this.selectedProduct.location;
        this.image = this.selectedProduct?.image;
        if(this.selectedProduct.assignedUser != null && this.assignedUser != undefined)
          this.assignedUser = this.selectedProduct.assignedUser;
        if(this.assignedUser != null && this.assignedUser != undefined && this.assignedUser != ""){
          this.assigned = true;
        }
      }
    }
    
  }

  requestProduct(){
    
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('data:image/')){
      return false;
    }
    return true;
  }

}
