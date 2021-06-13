import { useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import { authAtions } from "../redux/auth/action";

export const useAuth = () => {
  const { loading, error, request } = useHttp();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const login = useCallback((data) => {
    setUserId(data.id);
    setToken(data.token);    
    localStorage.setItem(
      "userData",
      JSON.stringify({ data })
    );
    dispatch(authAtions.setLogin(data.id,data.token,true));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null)
    localStorage.removeItem("userData");
    dispatch(authAtions.setLogout(null,null,false));
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data?.data?.token) {
      login(data.data);
    }
  }, [login]);

  return { login, logout, token, userId };
};
