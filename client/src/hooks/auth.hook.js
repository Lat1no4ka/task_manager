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

  const checkToken = async (body) => {
    try {
      const data = await request(
        "http://127.0.0.1:8080/checkToken",
        "POST",
        JSON.stringify(body)
      );

      if(!data){
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    const check = checkToken(data);

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
