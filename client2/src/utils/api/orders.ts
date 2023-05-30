import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateOrderDTO, CreateRedirectUrlDto, InitiatePaymentDto } from '../../interfaces';

export const ordersAPI = (instance: AxiosInstance) => ({

  async createOrder(dto: CreateOrderDTO) {
    try {
      const { data, error } = await instance.post<any, any>(
        '/order/',
        {
          items: dto.items
        }
      );
      return data;
    } catch (e: any) {
      throw new Error(e.message)
    }
  },

  async initiatePayment(paymentDto: InitiatePaymentDto) {
    try {
      const { data } = await instance.post<any, any>(
        '/order/transaction',
        {
          ...paymentDto,
        }
      );
      return data;
    } catch (e: any) {
      throw new Error(e.message)
    }
  },
});


