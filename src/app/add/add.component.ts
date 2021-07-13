import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Icon } from '../models/icon';
import { Type } from '../models/type';
import { ProductService } from '../services/project.service';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';




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

  alreadyExist = false

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {


  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  onSubmit() {

    if (!this.form.valid) {
      this.form.markAllAsTouched()
      this.presentToast("Inserisci almeno i campi obbligatori")
      return
    }

    this.productService.checkIfProductExist(this.form.controls.name.value).pipe(

      catchError(error => {

        this.alreadyExist = true
        this.presentToast(error)
        return throwError(error);


      }),
      switchMap(() => this.productService.addProduct(this.form.value))

    ).subscribe((data) => {
      console.log(data);

      this.router.navigate(['/home'])
    })


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


  addQuantity() {

    let qty = this.form.controls.quantity.value
    qty++

    this.form.patchValue({ quantity: qty })

  }

  removeQuantity() {

    let qty = this.form.controls.quantity.value
    qty < 1 ? null : qty--

    // this.form.patchValue({ quantity:qty })
  }

}
