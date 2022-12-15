import { ListParams, ListResponse, Banner } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { ResponseMessage } from '../models/common';

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
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.reasonImage, data);
  },
};

export default bannerApi;
