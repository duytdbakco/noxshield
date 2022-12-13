import { EXPIRED_TIME, TOKEN } from './constants';

/* eslint-env browser */
const auth = {
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN) ?? sessionStorage.getItem(TOKEN);
    var expires_in = localStorage.getItem(EXPIRED_TIME) ?? sessionStorage.getItem(EXPIRED_TIME);
    expires_in = expires_in * 36000000;
    //console.log(expires_in);
    const expiredTime = new Date(expires_in);
    console.log(expiredTime);
    console.log(new Date());
    // hết thời gian
    if (token && expiredTime > new Date()) {
      return true;
    }
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(EXPIRED_TIME);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(EXPIRED_TIME);
    return false;
  },
};
export default auth;
