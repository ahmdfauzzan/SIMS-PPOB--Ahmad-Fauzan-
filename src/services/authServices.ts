import { useMutation } from '@tanstack/react-query';
import { api } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth';


export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<AuthResponse> => {
      const response = await api.post('/login', data);
      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest): Promise<AuthResponse> => {
      const response = await api.post('/registration', data);
      return response.data;
    },
  });
};