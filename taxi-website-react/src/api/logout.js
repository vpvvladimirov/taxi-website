import { useCallback } from 'react';

const useLogout = () => {
  const logout = useCallback(() => {
    sessionStorage.clear();
    window.location.href = '/login';
  }, []);

  return logout;
};

export default useLogout;
