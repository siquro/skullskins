import { AxiosInstance, AxiosResponse } from 'axios';
import { UpdateTradeURLDTO, VerifyEmailDTO } from '../../interfaces';
import { rejects } from 'assert';

export const userAPI = (instance: AxiosInstance) => ({

  async login(dto: any) {
    console.log('login,', dto)
    return new Promise<string>((resolve) => {
      instance
        .post<any, AxiosResponse<any>>('/auth/login', dto)
        .then((res) => resolve(res.data));
    });
  },
  async getTrades() {
    const { data } = await instance.get<null, { data: any }>(
      '/user/trades',
    );
    return data;
  },
  async sendTrade(orderId: number) {
    return new Promise<any>((resolve, reject) => {
      instance
        .post<any, AxiosResponse<any>>('/order/sendTradeOffer', {
          orderId
        })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e.code));
    });
  },
  async getMe(accessToken: string) {
    const { data } = await instance.get<null, { data: any }>(
      '/user',
      { params: { accessToken: accessToken } }
    );
    return data;
  },
  async getBillingInfo() {
    const { data } = await instance.get<null, { data: any }>(
      '/user/billing',
    );
    return data;
  },
  async verifyEmail(dto: VerifyEmailDTO) {
    return new Promise<string>((resolve, reject) => {
      instance
        .post<any, AxiosResponse<any>>('/user/email', dto)
        .then((res) => resolve(res.data))
        .catch((e) => reject(e.code));
    });
  },
  async updateTradeOfferLink(dto: UpdateTradeURLDTO) {
    return new Promise<string>((resolve, reject) => {
      instance
        .post<any, AxiosResponse<any>>('/user/tradeURL', dto)
        .then((res) => resolve(res.data))
        .catch((e) => reject(e.code));
    });
  },

  async updateEmail(token: string) {
    return new Promise<string>((resolve) => {
      instance
        .post<any, AxiosResponse<any>>('/user/email/verify', {
          token
        })
        .then((res) => resolve(res.data));
    });
  }




});
