import { createContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean
  login: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const passcode = import.meta.env.VITE_CODE;

  const login = async (code: string): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code !== passcode) {
          resolve(false);
        } else {
          localStorage.setItem("loginAt", Date.now().toString());
          setIsAuthenticated(true);
          resolve(true);
        }
        setLoading(false);
      }, 800);
    })

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }