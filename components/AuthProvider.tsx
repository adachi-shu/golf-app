import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import {
  User as AuthUser,
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import LoginComponent from "./Login";
import { getUser } from "@/adminFirestore";

interface AuthContextType {
  authUser?: AuthUser;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithLine: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  login: async () => {},
  logout: async () => {},
  loginWithApple: async () => {},
  loginWithLine: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface Props {
  children: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [isInitialized, setIsInitialized] = useState(false);
  const auth = useMemo(() => getAuth(), []);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user ?? undefined);
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async () => {
    if (auth.currentUser) {
      setAuthUser(auth.currentUser);
      return;
    }
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login error:", error);
    }
  }, [auth]);

  const loginWithApple = useCallback(async () => {
    if (auth.currentUser) {
      setAuthUser(auth.currentUser);
      return;
    }
    try {
      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Apple login error:", error);
    }
  }, [auth]);

  const loginWithLine = useCallback(async () => {
    const lineProvider = new OAuthProvider("oidc.line-login");
    await signInWithPopup(auth, lineProvider)
      .then((result) => {
        if (result) {
          const credential = OAuthProvider.credentialFromResult(result);
          const accessToken = credential?.accessToken;
          const idToken = credential?.idToken;
        }
      })
      .catch((error) => {
        // Handle error.
      });
  }, [auth]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [auth]);

  useEffect(() => {
    setTimeout(() => setIsInitialized(true), 500);
  }, []);
  if (!isInitialized) return <></>;

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, loginWithApple, loginWithLine }}
    >
      {authUser ? children : <LoginComponent />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
