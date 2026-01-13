export interface ForgotPasswordFormData {
  email: string;
}

export type ForgotPasswordVariant = '1' | '2' | '3';

export interface ForgotPasswordFeatures {
  showLoginLink?: boolean;
}
