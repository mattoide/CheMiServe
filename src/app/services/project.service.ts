import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  products: Product[]

  constructor() { }

  getProducts(): Observable<Product[]>{

    this.products = JSON.parse(localStorage.getItem("products"))

    return of(this.products)
  }

  addProduct(product:Product):Observable<boolean>{

    let products: any[] = JSON.parse(localStorage.getItem("products"))

    if (products === null)
      products = []
    
    products.push(product)
    localStorage.setItem("products", JSON.stringify(products))
    

    return of(true)
  }
}
