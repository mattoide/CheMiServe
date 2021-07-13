import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[]

  constructor() { }

  getProducts(): Observable<Product[]> {

    this.products = JSON.parse(localStorage.getItem("products"))

    return of(this.products)
  }

  addProduct(product: Product): Observable<Error | boolean> {

    try {

      let products: any[] = JSON.parse(localStorage.getItem("products"))

      if (products === null)
        products = []

      products.push(product)
      localStorage.setItem("products", JSON.stringify(products))

      return of(true)

    } catch (e) {
      throw e
    }

  }

  checkIfProductExist(pname: string): Observable<Error | boolean> {
    let products: any[] = JSON.parse(localStorage.getItem("products"))

    if (!products)
      products = []

    let productPresent = products.find(({ name }) => name.toLowerCase() == pname.toLowerCase())

    if (productPresent)
      return throwError("Esiste gia un prodotto con questo nome");
    else
      return of(false)

  }

  deleteProduct(pproduct: Product): Observable<Product[]> {

    let products: any[] = JSON.parse(localStorage.getItem("products"))

    let filtered = products.filter(function (value, index, arr) {
      return value.name != pproduct.name;
    });

    localStorage.setItem("products", JSON.stringify(filtered))

    return of(filtered)
  }

  updateProduct(product: Product): Observable<any>{

    //per modifica completa

    // this.checkIfProductExist(product.name).pipe(

    //   tap(()=> {

    //     let products: any[] = JSON.parse(localStorage.getItem("products"))


    //     let updated = products.filter(p => p.name == product.name ).map(p =>{
    //       p.name = product.name
    //       p.description = product.description
    //       p.quantity = product.quantity
    //       p.measureUnit = product.measureUnit
    //       p.type = product.type
    //     }) 

    //     localStorage.setItem("products", JSON.stringify(updated))
    //     return of(updated)
    //   }
    //   )
    // ).subscribe()

    // return of(null)

    //per update quantià

    let products: any[] = JSON.parse(localStorage.getItem("products"))


    products.filter(p => p.name == product.name ).map(p =>{

     // console.log(p);
      
      p.name = product.name
      p.description = product.description
      p.quantity = product.quantity
      p.measureUnit = product.measureUnit
      p.type = product.type
    }) 

    localStorage.setItem("products", JSON.stringify(products))
    return of(products)

  }
}
