import { ListParams, ListResponse, Reason, ResponseMessage } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const reasonApi = {
  getAll(params: ListParams): Promise<ListResponse<Reason>> {
    return axiosClient.get(apiLinks.reason, { params });
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.reasonImage, data);
  },
  getById(id: string): Promise<Reason> {
    return axiosClient.get(`${apiLinks.reason}/${id}`);
  },

  add(data: Reason): Promise<Reason> {
    return axiosClient.post(apiLinks.reason, data);
  },

  update(data: Partial<Reason>): Promise<Reason> {
    const url = `${apiLinks.reason}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.reason}/${id}`);
  },
};

export default reasonApi;
