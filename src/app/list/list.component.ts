import { Component, OnInit } from '@angular/core';
import { Icon } from '../models/icon';
import { Type } from '../models/type';
import { Product } from '../models/product.model';
import { Unit } from '../models/unit';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  products: Product[];
  limit: number = 5

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(val => {
      this.projectService.getProducts().subscribe(products =>{
        this.products = products
      })
        
    });
  }
   

  ngOnInit() {

    // this.products = [
    //   {id: "ascasd",name: "uova", icon: Icon.eat, quantity: 5, measureUnit: Unit.package, description: "carbonarta?", type: Type.eat},
    //   {id: "45f4", name: "latte", icon: Icon.drink, quantity: 2, measureUnit: Unit.single, description: "", type: Type.drink},
    //   {id: "ssds",name: "pasta", icon: Icon.eat, quantity: 1, description: "lunga", type: Type.eat},
      
    // ]
     this.projectService.getProducts().subscribe(products =>{
      this.products = products
    })

  }

  updateProduct(product:Product){
    
    this.products.filter(p => p.id == product.id ).map(p =>{
      p.name = product.name
      p.description = product.description
      p.quantity = product.quantity
      p.measureUnit = product.measureUnit
      p.type = product.type
    })   

    
  }

}
