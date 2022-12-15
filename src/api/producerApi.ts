import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { ResponseMessage } from '../models/common';
import { Producer } from '../models/producer';

const producerApi = {
  getAll(params: ListParams): Promise<ListResponse<Producer>> {
    return axiosClient.get(apiLinks.producer, { params });
  },

  getById(id: string): Promise<Producer> {
    return axiosClient.get(`${apiLinks.producer}/${id}`);
  },

  add(data: Producer): Promise<Producer> {
    return axiosClient.post(apiLinks.producer, data);
  },

  update(data: Partial<Producer>): Promise<Producer> {
    const url = `${apiLinks.producer}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.producer}/${id}`);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.reasonImage, data);
  },
};

export default producerApi;
