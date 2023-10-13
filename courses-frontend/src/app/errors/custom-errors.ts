import { FormGroup } from "@angular/forms";
export abstract class ErrorHandlerForm {
  abstract formGroup?: FormGroup;
  hasError(fieldName: string) {
    return isError(fieldName, this.formGroup);
  }
  getError(fieldName: string) {
    return mapFirstErrorToMessage(fieldName, this.formGroup);
  }
}
const isError = (fieldName: string, formGroup?: FormGroup) => {
  return !!(formGroup?.controls?.[fieldName]?.errors);
}
const getFirstError = (fieldName: string, formGroup?: FormGroup) => {
  return Object.entries(formGroup?.controls?.[fieldName]?.errors || {})[0];
}
const errorMessageMapper = (error: [string, any]) => {
  switch(error[0]) {
    case 'required':
      return 'To pole jest wymagane.';
    case 'email':
      return 'Nieprawidłowy format e-mail.'
    case 'maxlength':
      return `Wartość powinna zawierać co najwyżej ${error[1]['requiredLength']} znaków.`
    default:
      return typeof error[1] === 'string' ? error[1] : 'Nieprawidłowa wartość.';
  }
}
const mapFirstErrorToMessage = (fieldName: string, formGroup?: FormGroup) => {
  return errorMessageMapper(getFirstError(fieldName, formGroup));
}
