import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { ResponseMessage } from '../models/common';
import { Case } from '../models/case';

const caseApi = {
  getAll(params: ListParams): Promise<ListResponse<Case>> {
    return axiosClient.get(apiLinks.case, { params });
  },

  getById(id: string): Promise<Case> {
    return axiosClient.get(`${apiLinks.case}/${id}`);
  },

  add(data: Case): Promise<Case> {
    return axiosClient.post(apiLinks.case, data);
  },

  update(data: Partial<Case>): Promise<Case> {
    const url = `${apiLinks.case}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.case}/${id}`);
  },
  importFile(file: File): Promise<ResponseMessage<any>> {
    const data = new FormData();
    data.append('file', file);
    return axiosClient.post(apiLinks.reasonImage, data);
  },
};

export default caseApi;
