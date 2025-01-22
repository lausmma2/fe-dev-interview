export const FormTypeValues = {
  CREATE: 'create',
  VIEW: 'view',
  EDIT: 'edit',
} as const;

export type FormType = (typeof FormTypeValues)[keyof typeof FormTypeValues];
