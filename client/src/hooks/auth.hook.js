import { useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";

export const useAuth = () => {
  const { loading, error, request } = useHttp();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((fToken, id) => {
    setUserId(id);
    setToken(fToken);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: fToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const notAuth = {userId:null,token:null};

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
