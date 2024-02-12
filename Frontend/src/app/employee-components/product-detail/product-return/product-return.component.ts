import { Component, Input, EventEmitter, Output} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AnimationsService } from '../../../services/animations.service';
import { Product } from '../../../model/product';
import { ProductProxy } from '../../../model/productProxy';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-product-return',
  templateUrl: './product-return.component.html',
  styleUrls: [
    './product-return.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})
export class ProductReturnComponent {

  constructor(
    private productService: ProductService, 
    private animationsService: AnimationsService, 
    private errorService: ErrorService) { }

  productRequestWindow: boolean = true;

  @Input() product: Product | undefined;

  productProxy: ProductProxy | undefined;

  idItem: number = 0;
  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assigned: boolean = false;
  assignedUser: string = '';

  ngOnInit(): void {

    this.animationsService.initResizeObserver('product-request');
    
    this.getAllInfo();
  }

  ngAfterView() {
    this.getAllInfo();
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

  @Output() onCloseEvent = new EventEmitter<productReqestEventData>();

  onClose() {
    const eventData: productReqestEventData = {
      requestProductWindow: false
    };
    this.onCloseEvent.emit(eventData);
    console.log('onClose');
  }

}

export interface productReqestEventData {
  requestProductWindow: boolean;
}
