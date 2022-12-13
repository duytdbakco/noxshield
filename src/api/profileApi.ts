import { ServiceForm } from 'models';
import { ProfilePayload } from 'models/profilePayload';
import { UserInfor } from 'models/userinfor';
import { apiLinks } from 'utils';
import axiosClient from './axiosClient';

export const profileApi = {
  post(payload: ProfilePayload): Promise<UserInfor> {
    return axiosClient.post(apiLinks.auth.login, payload);
  },
  get(): Promise<ServiceForm[]> {
    return axiosClient.get(apiLinks.serviceForm.get);
  },
};
