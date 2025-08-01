import {login} from '../../services/api';

export const useLogin = ({email, password}) => {
  function submit() {
    login({email, password});
  }

  return {
    submit,
  };
};
