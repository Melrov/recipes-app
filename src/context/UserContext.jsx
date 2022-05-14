import React, { createContext, useCallback, useEffect, useState } from "react";
import useServerFetch from "../hooks/useServerFetch";

export const UserContext = createContext(null);

function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [uError, setUError] = useState(null);
  const [pError, setPError] = useState(null);
  const [showError, setShowError] = useState(false);
  const { login: apiLogin, logout: apiLogout } = useServerFetch()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (userName.length < 4 || userName.length > 10) {
      setUError("Mush be between 4 and 10 characters");
    } else {
      setUError(null);
    }
    if (password.length < 4 || password.length > 10) {
      setPError("Mush be between 4 and 10 characters");
    } else {
      setPError(null);
    }
  }, [userName, password]);

  const login = useCallback( async (e) => {
      e.preventDefault()
    if (!showError) {
      setShowError(true);
    }
    if (!uError && !pError) {
      const res = await apiLogin(userName, password)
      //console.log(res)
      if(res.data.success){
        setUser(userName)
        setUserName("")
        setPassword("")
      }
      else {
        setError(res.data.error)
      }
    }
    return false;
  }, [uError, pError, userName, password, showError]);

  const logout = useCallback( async() => {
      const res = await apiLogout()
      if(res.data.success){
        setUser(null)
        // TODO will need to clear recipes, pantry and shopping list also maybe settings
      }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        password,
        setPassword,
        uError,
        pError,
        error,
        showError,
        login,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
