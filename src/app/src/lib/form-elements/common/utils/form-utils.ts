import { FormComponentSizeEnum } from '../form-element-common';

/**
 * Gets common container classes to form components
 */
export function getContainerClasses(
  baseClass: string,
  containerClass?: string,
  labelStyle?: string,
  hasLabel = true,
  size?: string,
  variant?: string,
): { [key: string]: boolean } {
  return {
    [baseClass]: true,
    [containerClass || '']: !!containerClass,
    [labelStyle || '']: !!labelStyle,
    'no-label': !hasLabel,
    [size || '']: !!size,
    [variant || '']: !!variant,
  };
}

/**
 * Gets common input element classes
 */
export function getInputClasses(
  inputClass?: string,
  hasErrors = false,
  size?: FormComponentSizeEnum,
): { [key: string]: boolean } {
  return {
    [inputClass || '']: !!inputClass,
    'ng-invalid ng-dirty': hasErrors,
    'p-inputtext-sm': size === FormComponentSizeEnum.SMALL,
    'p-inputtext-lg': size === FormComponentSizeEnum.LARGE,
  };
}

/**
 * Common validation message generator
 */
export function getValidationMessage(errors: any, customErrorMessage?: string): string | null {
  // Custom error message takes precedence
  if (customErrorMessage) {
    return customErrorMessage;
  }

  if (!errors) return null;

  // Handle all common validation types
  if (errors['required']) return 'This field is required';
  if (errors['email']) return 'Please enter a valid email address';
  if (errors['minlength'])
    return `Please enter at least ${errors['minlength'].requiredLength} characters`;
  if (errors['maxlength'])
    return `Please enter no more than ${errors['maxlength'].requiredLength} characters`;
  if (errors['pattern']) return 'Please enter a valid value';
  if (errors['min']) return `Value must be at least ${errors['min'].min}`;
  if (errors['max']) return `Value must be no more than ${errors['max'].max}`;
  if (errors['matDatepickerMin'])
    return `Date must be after ${errors['matDatepickerMin'].min.toLocaleDateString()}`;
  if (errors['matDatepickerMax'])
    return `Date must be before ${errors['matDatepickerMax'].max.toLocaleDateString()}`;

  // Generic fallback
  return 'This field is invalid';
}
