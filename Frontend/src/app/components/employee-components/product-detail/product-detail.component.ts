import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { ProductService } from '../../../services/product.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: [
    './product-detail.component.css',
    '../../../styles/container.css',
    '../../styles/content.css',
    '../../styles/buttons.css'
  ]
})
export class ProductDetailComponent {

  constructor(private productService:ProductService, private errorService:ErrorService) { }

  product: Product | undefined;

  productProxy: Product | undefined;

  selectedProduct: Product | undefined = undefined;

  idItem: number = 0;
  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assignedUser: string = '';
  assigned: boolean = false;
  previusPage: string = '';

  requestProductWindow: boolean = false;
  returnProductWindow: boolean = false;

  ngOnInit() {
    const previousPage = localStorage.getItem('previousPage');
    if (previousPage !== null && previousPage !== undefined) {
      this.previusPage = previousPage;
    }
    const selectedProduct = localStorage.getItem('selectedProduct');
    if (selectedProduct !== null && selectedProduct !== undefined) {
      this.selectedProduct = JSON.parse(selectedProduct);

      if(this.selectedProduct != null && this.selectedProduct != undefined){
        this.product = this.selectedProduct;
        this.getAllInfo();
      }
    }
  }

  getAllInfo(){
    if (this.product && this.product.idItem) {
      this.productService.getProduct(this.product.idItem).subscribe({
        next: (data) => {
          this.productProxy = data;

          this.description = this.productProxy?.description || '';
          if (this.productProxy?.location && this.productProxy?.location != 'Magazzino')
            this.location = this.productProxy?.location || '';
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
      this.idItem = this.product.idItem || 0;
      this.name = this.product.name || '';
      this.type = this.product.type || '';
      this.image = this.product.image || '';
      this.length = this.image ? this.image.length : 0;

      if (this.product.assignedUser && typeof this.product.assignedUser === 'object')
        this.assignedUser = this.product.assignedUser.email;
      else
        this.assignedUser = '';

      if (this.assignedUser && this.assignedUser.length > 0)
        this.assigned = true;
    }
  }

  requestProduct(){
    this.requestProductWindow = true;
  }

  returnProduct(){
    this.returnProductWindow = true;
  }

  onClose(eventData: productRequestEventData){
    this.requestProductWindow = eventData.requestProductWindow;
    this.returnProductWindow = eventData.requestProductWindow;
  }

}

export interface productRequestEventData {
  requestProductWindow: boolean;
}
