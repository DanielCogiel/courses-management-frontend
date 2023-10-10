import { AbstractControl } from "@angular/forms";
function passwordMatchValidator(control: AbstractControl) {
  const passwordValue = control.parent?.value['password'];
  return passwordValue === control.value ? null : { 'passwordNotSame': 'Hasła nie są takie same.' }
}
export default passwordMatchValidator;
