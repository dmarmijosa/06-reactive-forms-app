import { FormGroup } from '@angular/forms';
export class FormUtils {
  static isValidField(form: FormGroup, fileName: string): boolean | null {
    return !!form.controls[fileName].errors && form.controls[fileName].touched;
  }
  static getFileName(myForm: FormGroup, fileName: string): string | null {
    if (!myForm.controls[fileName]) return null;
    const error = myForm.controls[fileName].errors ?? {};
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
}
