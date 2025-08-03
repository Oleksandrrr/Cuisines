import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {loginUser} from '../../slice';
import {selectAuthError, selectAuthLoading} from '../../slice';

export interface UseLoginReturn {
  isLoading: boolean;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('handleLogin', email, password);
      await dispatch(loginUser({email, password})).unwrap();
      // After successful login, user will be automatically redirected to Dashboard
      // through RootNavigation based on Redux state
    } catch (loginError) {
      console.error('Login error:', loginError);
      throw loginError;
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
  };
};
