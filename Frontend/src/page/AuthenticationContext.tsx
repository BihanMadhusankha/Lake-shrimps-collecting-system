import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  role: string;
}

interface AuthContextProps {
  currentUser: User | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  isAuth: false,
  setToken: () => {},
  setRole: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setCurrentUser(JSON.parse(token)?.user);
      setIsAuth(true);
      setRole(JSON.parse(token)?.user?.role); // Extract role from token
    }
  }, []);

  const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    setCurrentUser(JSON.parse(token)?.user);
    setIsAuth(true);
    setRole(JSON.parse(token)?.user?.role); // Extract and set role
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuth, role, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
