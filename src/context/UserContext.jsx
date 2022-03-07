import React, { createContext, useCallback, useEffect, useState } from "react";
import useServerFetch from "../hooks/useServerFetch";

export const UserContext = createContext(null);

function UserProvider(props) {
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [uError, setUError] = useState(null);
  const [pError, setPError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [queryUserName, setQueryUserName] = useState(null)
  const [queryPassword, setQueryPassword] = useState(null)
  const [query, setQuery] = useState(null)
  const { data, error, loading } = useServerFetch("post", "/users/login", null, {username: queryUserName, password: queryPassword})

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

  const login = useCallback( (e) => {
      e.preventDefault()
    if (!showError) {
      setShowError(true);
    }
    if (!uError && !pError) {
      setQueryUserName(userName)
      setQueryPassword(password)
      setPassword("")
    }
    return false;
  }, [uError, pError, userName, password, showError]);

  useEffect(() => {
    if(data){
      if(data.username && data.id){
        setUser(data.username)
        setUserId(data.id)
        setUserName("")
        setPassword("")
        setShowError(false)
      }
    }
  }, [data])

  const logout = useCallback(() => {
      setUser(null)
      setUserId(null)
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        userName,
        setUserName,
        password,
        setPassword,
        uError,
        pError,
        showError,
        login,
        logout,
        userId
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
