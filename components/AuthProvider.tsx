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
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import LoginComponent from "./Login";
import { getUser } from "@/adminFirestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firebaseAuth from "@react-native-firebase/auth";
import { authData } from "@/firebaseConfig";

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
  const [authUser, setAuthUser] = useState<AuthUser | undefined>();
  const [isInitialized, setIsInitialized] = useState(false);
  const auth = useMemo(() => authData, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user ?? undefined);
    });
    return unsubscribe;
  }, []);

  // GoogleSignin.configure({
  //   // google-services.jsonまたはGoogleService-Info.plistに記載されているCLIENT_ID
  //   webClientId: "",
  // });

  const login = useCallback(async () => {
    // if (auth.currentUser) {
    //   setAuthUser(auth.currentUser);
    //   return;
    // }
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login error:", error);
    }

    // モバイルアプリ用
    // try {
    //   const user = await GoogleSignin.signIn();
    //   const idToken = user.data?.idToken;

    //   if (idToken === null) {
    //     console.error("Google sign in error: idToken is null");
    //   }

    //   if (idToken !== undefined) {
    //     const authCredential =
    //       firebaseAuth.GoogleAuthProvider.credential(idToken);
    //     const userCredential = await firebaseAuth().signInWithCredential(
    //       authCredential
    //     );
    //     setAuthUser(userCredential.user);
    //   } else {
    //     console.error("Google sign in error: idToken is undefined");
    //   }
    // } catch (e) {
    //   throw new Error("Firebase google login error: " + JSON.stringify(e));
    // }
  }, [auth]);

  const loginWithApple = useCallback(async () => {
    try {
      const provider = new OAuthProvider("apple.com");
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Apple login error:", error);
    }
  }, [auth]);

  const loginWithLine = useCallback(async () => {
    console.log("loginWithLine");
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
        console.error("Line login error:", error);
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
