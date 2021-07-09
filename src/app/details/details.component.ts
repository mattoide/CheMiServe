import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Icon } from '../models/icon';
import { Product } from '../models/product.model';
import { Type } from '../models/type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DetailsComponent implements OnInit {

  @Input() product: Product
  @Input() limit: number
  @Output() updateProduct  = new EventEmitter();

  prod: Product

  constructor() { }

  ngOnInit() {
    this.prod = {...this.product}
  }

  updateMeasureUnit(evt){

    this.prod.measureUnit = evt.detail.value;
    this.updateProduct.emit(this.prod)
  }

  addQuantity(){
    this.prod.quantity++;
    this.updateProduct.emit(this.prod)
  } 

   removeQuantity(){
    this.prod.quantity < 1 ? null : this.prod.quantity--
    this.updateProduct.emit(this.prod)
  }

}
