const base_url = `https://smarthtdev.bakco.vn/api`;
const noxShieldModule = `http://localhost:8000`;
export const apiLinks = {
  auth: {
    login: `${base_url}/Auth/Admin/Login`,
    signUp: ``,
  },
  serviceForm: {
    get: ``,
  },
  banner: `${noxShieldModule}/Banner`,
  case: `${noxShieldModule}/Case`,
  content: `${noxShieldModule}/Content`,
  producer: `${noxShieldModule}/Producer`,
  reason: `${noxShieldModule}/Reason`,
  reasonImage: `${noxShieldModule}/ReasonImage/ImportByImage`,
};
