import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from './api';
import type { 
  ProfileResponse, 
  BalanceResponse, 
  ServicesResponse, 
  BannersResponse 
} from '../types/dashboard';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<ProfileResponse> => {
      const response = await api.get('/profile');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useBalance = () => {
  return useQuery({
    queryKey: ['balance'],
    queryFn: async (): Promise<BalanceResponse> => {
      const response = await api.get('/balance');
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 2,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<ServicesResponse> => {
      const response = await api.get('/services');
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useBanners = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async (): Promise<BannersResponse> => {
      const response = await api.get('/banner');
      return response.data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
};

// Mutation for top up balance
export const useTopUp = () => {
  return useMutation({
    mutationFn: async (amount: number) => {
      const response = await api.post('/topup', { top_up_amount: amount });
      return response.data;
    },
  });
};

// Mutation for service payment
export const usePayment = () => {
  return useMutation({
    mutationFn: async (serviceCode: string) => {
      const response = await api.post('/transaction', { service_code: serviceCode });
      return response.data;
    },
  });
};