import { useHistory } from 'react-router-dom';

const useNavigate = (initialValue: string) => {
  const history = useHistory();
  const handleRouterChange = () => {
    history.push(`${initialValue}`);
    window.location.reload();
  };
  return { handleRouterChange };
};

export default useNavigate;
