import { AxiosInstance, AxiosResponse } from 'axios';

export const itemsAPI = (instance: AxiosInstance) => ({

  async getListing(appId: string, page: number) {
    try {
      const { data } = await instance.get<null, any>(
        '/steam/items',
        {
          params: {
            appId: +appId,
            page
          }
        }
      );
      return data;
    } catch (e: any) {
      throw new Error(e.message)
    }


  },
  async checkItemForQuantity(appId: string, assetId: string) {
    try {
      const { data } = await instance.post<null, any>(
        '/steam/items/check',
        {
          body: {
            appId,
            assetId
          }
        }
      );
      return data;
    } catch (e: any) {
      throw new Error(e.message)
    }
  }
});


