import { Component, Input, EventEmitter, Output} from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { AnimationsService } from '../../../../services/animations.service';
import { Product } from '../../../../models/product';
import { ErrorService } from '../../../../services/error.service';
import { RequestService } from '../../../../services/request.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: [
    './product-request.component.css',
    '../../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})
export class ProductRequestComponent {

  constructor(
    private productService: ProductService,
    private requestService: RequestService,
    private animationsService: AnimationsService,
    private errorService: ErrorService,
    private authService: AuthService) { }

  productRequestWindow: boolean = true;

  @Input() product: Product | undefined;

  idItem: number = 0;
  emailUser: string = '';

  title: string = '';
  description: string = '';
  date = new Date();
  type = 'requestProduct';

  ngOnInit(): void {

    this.animationsService.initResizeObserver('product-request');

    this.getAllInfo();
  }

  ngAfterView() {
    this.getAllInfo();
  }

  getAllInfo(){
    if (this.product && this.product.idItem)
      this.idItem = this.product.idItem;
    this.emailUser = this.authService.getUserEmail();
  }

  @Output() onCloseEvent = new EventEmitter<productReqestEventData>();

  onClose() {
    const eventData: productReqestEventData = {
      requestProductWindow: false
    };
    this.onCloseEvent.emit(eventData);
  }

  onReturn() {
    const request = {
      title: this.title,
      description: this.description,
      status: 'pending',
      type: this.type,
      date: this.date,
      requestedItem: this.idItem,
      requestingUser: this.emailUser
    };
    this.requestService.sendRequest(request);
    this.requestService.updateLocalRequests(request);
    this.onClose();
  }
}

export interface productReqestEventData {
  requestProductWindow: boolean;
}
