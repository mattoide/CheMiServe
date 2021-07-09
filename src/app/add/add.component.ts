import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Icon } from '../models/icon';
import { Type } from '../models/type';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    quantity: [''],
    measureUnit: [''],
    description: [''],
    type: ['', Validators.required],
    icon: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectService,
    private router: Router
    ) { }

  ngOnInit() { }

  onSubmit() {

   
    this.projectsService.addProduct(this.form.value).subscribe(val =>{
      console.log(val);
      this.router.navigate(['/home'])
      
    });
    

  }

  selectIcon(evt) {

    this.form.patchValue({ type: evt.detail.value })

    switch (evt.detail.value) {

      case Type.drink:
        this.form.patchValue({ icon: Icon.drink })
        break;

      case Type.eat:
        this.form.patchValue({ icon: Icon.eat })
        break;

      case Type.seasoning:
        this.form.patchValue({ icon: Icon.seasoning })
        break;

      default:
        break;
    }
  }


  addQuantity(){

    let qty =  this.form.controls.quantity.value
    qty++
    
    this.form.patchValue({ quantity: qty })
    
  } 

   removeQuantity(){

    let qty =  this.form.controls.quantity.value
    qty < 1 ? null : qty--
    
   // this.form.patchValue({ quantity:qty })
  }

}
