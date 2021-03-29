import { useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useDispatch } from "react-redux";
import { authAtions } from "../redux/auth/action";

export const useAuth = () => {
  const { loading, error, request } = useHttp();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  const login = useCallback((fToken, id) => {
    setUserId(id);
    setToken(fToken);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: fToken })
    );
    dispatch(authAtions.setLogin(id,fToken,true));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
    dispatch(authAtions.setLogout(null,null,false));
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
