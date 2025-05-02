import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const { 
    user, 
    loading, 
    error,
    forgotPasswordSuccess,
    resetPasswordSuccess 
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    logout: handleLogout
  };
}; 