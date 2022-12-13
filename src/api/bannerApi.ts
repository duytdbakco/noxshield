import { ListParams, ListResponse, Banner } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const bannerApi = {
  getAll(params: ListParams): Promise<ListResponse<Banner>> {
    return axiosClient.get(apiLinks.banner, { params });
  },

  getById(id: string): Promise<Banner> {
    return axiosClient.get(`${apiLinks.banner}/${id}`);
  },

  add(data: Banner): Promise<Banner> {
    return axiosClient.post(apiLinks.banner, data);
  },

  update(data: Partial<Banner>): Promise<Banner> {
    const url = `${apiLinks.banner}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.banner}/${id}`);
  },
};

export default bannerApi;
