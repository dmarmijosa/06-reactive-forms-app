import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static isValidField(form: FormGroup, fileName: string): boolean | null {
    return !!form.controls[fileName].errors && form.controls[fileName].touched;
  }
  static getFiledErrorName(myForm: FormGroup, fileName: string): string | null {
    if (!myForm.controls[fileName]) return null;
    const error = myForm.controls[fileName].errors ?? {};
    return this.getErrorMessages(error);
  }

  static isValidFielInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFileErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (!formArray.controls[index]) return null;
    const error = formArray.controls[index].errors ?? {};
    return this.getErrorMessages(error);
  }
  private static getErrorMessages(error: ValidationErrors) {
    const patternMessages: { [key: string]: string } = {
      [this.emailPattern]: 'El correo debe ser valido',
      [this.notOnlySpacesPattern]: 'El username no debe tener espacios',
    };
    for (const key of Object.keys(error)) {
      switch (key) {
        case 'required':
          return 'Este campo requerido';
        case 'minlength':
          return `El campo debe tener al menos ${error[key].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mayor a ${error[key].min}`;
        case 'pattern':
          const requiredPattern = error[key]?.requiredPattern;
          if (requiredPattern && patternMessages[requiredPattern]) {
            return patternMessages[requiredPattern];
          }
          return 'El formato del campo es inválido';
        default:
          return 'Campo inválido';
      }
    }
    return null;
  }
}
