import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  products: Product[];
  limit: number = 0
  defaultSorting = "quantity"
  showTopInfo = false

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private menu: MenuController
  ) {

    this.limit =  Number(localStorage.getItem("limit"))
    if(!this.limit){

       this.limit = 0
      localStorage.setItem("limit",this.limit.toString())

    }



    activatedRoute.params.subscribe(val => {
      this.productService.getProducts().subscribe(products => {
        this.products = products
        this.sortBy(this.defaultSorting)
      })

    });
  }


  ngOnInit() {

    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.sortBy(this.defaultSorting)
    })

  }

  updateProduct(product: Product) {

    //need for local sorting
    this.products.filter(p => p.name == product.name).map(p => {

      // console.log(p);

      p.name = product.name
      p.description = product.description
      p.quantity = product.quantity
      p.measureUnit = product.measureUnit
      p.type = product.type
    })

    this.productService.updateProduct(product).subscribe(data => {

      //evito il refresh ;))))
      // this.products = data

    })


  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(data => {
      this.products = data
    })
  }

  sortBy(evt) {

    let sorting

    if (typeof evt == "string") {
      sorting = evt
    } else {
      sorting = evt.detail.value
    }

    switch (sorting) {

      case "quantity":

        this.products.sort(function (a, b) {
          return a.quantity - b.quantity;
        });

        break;

      case "name":

        this.products.sort(function (a, b) {

          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        break;

        case "type":

          this.products.sort(function (a, b) {

            var nameA = a.type.toUpperCase(); // ignore upper and lowercase
            var nameB = b.type.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
  
            // names must be equal
            return 0;
          });
          
          break;

      default:
        break;
    }

  }

  refresh(evt){
    this.sortBy(this.defaultSorting)
    evt.target.complete();
  }

  setLimit(){
    if(this.limit != 0)
    localStorage.setItem("limit",this.limit.toString())
    
  }
  increaseLimit(){
    this.limit++
    this.setLimit()
  }

  decreaseLimit(){
    this.limit < 1 ? null : this.limit--
    this.setLimit()

  }

  showTopInfoF(){
      this.showTopInfo = !this.showTopInfo
  }


}
