import { Component, Input, EventEmitter, Output} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AnimationsService } from '../../../services/animations.service';
import { Product } from '../../../model/product';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: [
    './product-request.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})
export class ProductRequestComponent {

  constructor(
    private productService: ProductService, 
    private animationsService: AnimationsService, 
    private errorService: ErrorService) { }

  productRequestWindow: boolean = true;

  @Input() product: Product | undefined;

  idItem: number = 0;
  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assigned: boolean = false;
  assigned_user: string = '';

  ngOnInit(): void {

    this.animationsService.initResizeObserver('product-request');
    
    if (this.product && this.product.idItem) {
      this.productService.getProduct(this.product.idItem).subscribe({
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
      
      this.idItem = this.product.idItem;
      this.name = this.product.name || '';
      this.type = this.product.type || '';
      this.description = this.product.description || '';
      if (this.product.location) {
        this.location = this.product.location;
      }
      this.image = this.product.image || '';
      this.length = this.image ? this.image.length : 0;

      if (this.product.assignedUser && typeof this.product.assignedUser === 'object')
        this.assigned_user = this.product.assignedUser.email;
      else 
        this.assigned_user = '';
      
      if (this.assigned_user && this.assigned_user.length > 0)
        this.assigned = true;
    }
  }

  ngAfterView() {
    if (this.product) {
      this.name = this.product.name || '';
      this.type = this.product.type || '';
      this.description = this.product.description || '';
      if (this.product.location) {
        this.location = this.product.location;
      }
      this.image = this.product.image || '';
      this.length = this.image ? this.image.length : 0;
      
      if (this.product.assignedUser && typeof this.product.assignedUser === 'object')
        this.assigned_user = this.product.assignedUser.email;
      else 
        this.assigned_user = '';

      if (this.assigned_user && this.assigned_user.length > 0)
        this.assigned = true;
    }
  }

  @Output() onEvent = new EventEmitter<productReqestEventData>();

  OnCloseEvent() {
    const eventData: productReqestEventData = {
      requestProductWindow: false
    };
    this.onEvent.emit(eventData);
  }

}

export interface productReqestEventData {
  requestProductWindow: boolean;
}
