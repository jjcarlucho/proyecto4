import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error
  };
}; 