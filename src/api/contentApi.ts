import { Content, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { ResponseMessage } from '../models/common';

const contentApi = {
  getAll(params: ListParams): Promise<ListResponse<Content>> {
    return axiosClient.get(apiLinks.content, { params });
  },

  getById(id: string): Promise<Content> {
    return axiosClient.get(`${apiLinks.content}/${id}`);
  },

  add(data: Content): Promise<Content> {
    return axiosClient.post(apiLinks.content, data);
  },

  update(data: any, id?: any): Promise<Content> {
    return axiosClient.put(`${apiLinks.content}/${id}`, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.content}/${id}`);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.reasonImage, data);
  },
};

export default contentApi;
