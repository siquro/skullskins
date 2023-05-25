import { AxiosInstance, AxiosResponse } from 'axios';
import { UpdateTradeURLDTO, VerifyEmailDTO } from '../../interfaces';
import { rejects } from 'assert';

export const userAPI = (instance: AxiosInstance) => ({

  async login(dto: any) {
    return new Promise<string>((resolve) => {
      instance
        .post<any, AxiosResponse<any>>('/auth/login', dto)
        .then((res) => resolve(res.data));
    });
  },

  async getMe() {
    const { data } = await instance.get<null, { data: any }>(
      '/user',
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
