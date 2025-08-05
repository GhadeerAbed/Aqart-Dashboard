"use client"
import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getAuthData, setAuthData } from "@/utils/page";
// utils/page.ts

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userData: any;
  updateUserData: (newData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(() => getAuthData() || {});
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authData = localStorage.getItem("authData");
    if (authData) {
      setIsAuthenticated(true);
      if (pathname === "/" || pathname === "/login") {
        router.push("/dashboard");
      }
    } else if (pathname !== "/" && pathname !== "/login") {
      router.push("/");
    }
  }, [pathname, router]);

  const updateUserData = (newData: any) => {
    setUserData((prevData: any) => ({
      ...prevData,
      ...newData,
    }));
    setAuthData({ ...userData, ...newData });
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, updateUserData ,  logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
