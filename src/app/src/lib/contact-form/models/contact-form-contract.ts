export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export type ContactFormVariant = '1' | '2' | '3';

export interface ContactFormFeatures {
  showPhoneField?: boolean;
  showSubjectField?: boolean;
  enableFileAttachment?: boolean;
}
