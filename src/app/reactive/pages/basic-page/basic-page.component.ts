import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // FormGroup is a class that represents a group of form controls
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  isValidField(fileName: string): boolean | null {
    return (
      this.myForm.controls[fileName].errors &&
      this.myForm.controls[fileName].touched
    );
  }
  getFileName(fileName: string): string | null {
    if (!this.myForm.controls[fileName]) return null;
    const error = this.myForm.controls[fileName].errors ?? {};
    for (const key of Object.keys(error)) {
      switch (key) {
        case 'required':
          return 'Este campo requerido';
        case 'minlength':
          return `El campo debe tener al menos ${error[key].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mayor a ${error[key].min}`;
        default:
          return 'Campo inválido';
      }
    }
    return null;
  }

  onSave() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({
      name: 'Danny',
      price: 100,
      inStorage: 50
    });
  }
}
