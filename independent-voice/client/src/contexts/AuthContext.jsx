import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as authService from '../services/authService';

import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState('auth', {});

  const loginSubmitHandler = async (values) => {
    authService.login(values.email, values.password).then((result) => {
      setAuth(result);
      navigate('/');
    }).catch((e) => {
      toast.error(`Error: ${e.code} ${e.message}`);
    });
  };

  const registerSubmitHandler = async (values) => {
    authService.register(values.email, values.password, values.username).then((result) => {
      setAuth(result);
      navigate('/');
    }).catch((e) => {
      toast.error(`Error: ${e.code} ${e.message}`);
    });
  };

  const logoutHandler = async () => {
    authService.logout().then(() => {
      setAuth({});
      navigate('/');
    }).catch((e) => {
      toast.error(`Error: ${e.code} ${e.message}`);
    });
  };

  const values = {
    logoutHandler,
    registerSubmitHandler,
    loginSubmitHandler,
    username: auth.username,
    isAuthenticated: !!auth.email,
    userId: auth._id,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;