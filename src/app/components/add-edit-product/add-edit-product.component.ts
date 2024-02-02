import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideRouter, Route, RouterLink } from '@angular/router';



@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup;

  constructor ( private fb: FormBuilder ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      secondLastname: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      area: ['', Validators.required],
      observations: ['', Validators.required]
    })
  }
}
