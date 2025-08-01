import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email wajib diisi'),
  password: yup
    .string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password wajib diisi'),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email wajib diisi'),
  first_name: yup
    .string()
    .required('Nama depan wajib diisi'),
  last_name: yup
    .string()
    .required('Nama belakang wajib diisi'),
  password: yup
    .string()
    .min(8, 'Password minimal 8 karakter')
    .required('Password wajib diisi'),
});