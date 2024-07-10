import React, { createContext, useState, useEffect, ReactNode } from 'react';


export interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    if (savedToken) {
        setAccessToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  );
};
