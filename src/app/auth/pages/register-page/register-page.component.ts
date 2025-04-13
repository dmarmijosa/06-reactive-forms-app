import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtil = FormUtils;

  myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtil.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtil.emailPattern)],
        [this.formUtil.chekingServerResponse]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtil.notOnlySpacesPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', Validators.required],
    },
    {
      validators: [this.formUtil.isFieldOneEqualFielTwo('password', 'password2')],
    }
  );



  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);
  }
}
