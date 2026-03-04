import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const form = control as FormGroup;
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword');

  if (!confirmPassword?.value) return null;

  if (password !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  confirmPassword.setErrors(null);
  return null;
};
