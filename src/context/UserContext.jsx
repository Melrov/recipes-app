import React, { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext(null);

function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [uError, setUError] = useState(null);
  const [pError, setPError] = useState(null);
  const [showError, setShowError] = useState(false);

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

  const login = useCallback((e) => {
      e.preventDefault()
    if (!showError) {
      setShowError(true);
    }
    if (!uError && !pError) {
      setUser(userName);
      setUserName("");
      setPassword("");
      setUError(null)
      setPError(null)
      setShowError(false)
      return true;
    }
    return false;
  }, [uError, pError, userName]);

  const logout = useCallback(() => {
      setUser(null)
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
        logout
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
