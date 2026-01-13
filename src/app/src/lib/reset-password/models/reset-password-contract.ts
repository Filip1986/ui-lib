export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export type ResetPasswordVariant = '1' | '2' | '3';

export interface ResetPasswordFeatures {
  showLoginLink?: boolean;
  showPasswordStrength?: boolean;
}
