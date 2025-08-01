export interface ProfileResponse {
  status: number;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
}

export interface BalanceResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ServicesResponse {
  status: number;
  message: string;
  data: Service[];
}

export interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface BannersResponse {
  status: number;
  message: string;
  data: Banner[];
}

export interface TopUpRequest {
  top_up_amount: number;
}

export interface TopUpResponse {
  status: number;
  message: string;
  data: {
    balance: number;
  };
}

export interface PaymentRequest {
  service_code: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: {
    invoice_number: string;
    service_code: string;
    service_name: string;
    transaction_type: string;
    total_amount: number;
    created_on: string;
  };
}