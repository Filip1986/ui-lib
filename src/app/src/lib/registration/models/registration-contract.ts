export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export type RegisterVariant = '1' | '2' | '3';

export interface RegisterFeatures {
  showTermsLinks?: boolean;
  showPasswordStrength?: boolean;
  showLoginLink?: boolean;
}
