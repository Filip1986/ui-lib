export function getCommonValidationMessage(errors: any, errorMessage?: string): string | null {
  // Return the custom error message if set
  if (errorMessage) {
    return errorMessage;
  }

  // Otherwise, return a message based on the error type
  if (errors['required']) {
    return 'This field is required';
  }

  if (errors['email']) {
    return 'Please enter a valid email address';
  }

  if (errors['minlength']) {
    return `Please enter at least ${errors['minlength'].requiredLength} characters`;
  }

  if (errors['maxlength']) {
    return `Please enter no more than ${errors['maxlength'].requiredLength} characters`;
  }

  if (errors['pattern']) {
    return 'Please enter a valid value';
  }

  if (errors['min']) {
    return `Value must be at least ${errors['min'].min}`;
  }

  if (errors['max']) {
    return `Value must be no more than ${errors['max'].max}`;
  }

  // If no specific error message was found, return a generic message
  return 'This field is invalid';
}
