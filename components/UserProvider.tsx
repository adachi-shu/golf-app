import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { UserInfoType, createUser, getUser } from "@/adminFirestore";
import { useAuth } from "./AuthProvider";

interface UserContextType {
  userId: string;
  userInfo: UserInfoType | undefined;
  roundId: string;
  handleUserId: (userId: string) => void;
  handleUserInfo: (userInfo: UserInfoType) => void;
  handleRoundId: (roundId: string) => void;
}

const defaultAuthContext: UserContextType = {
  userId: "",
  userInfo: undefined,
  roundId: "",
  handleUserId: () => {},
  handleUserInfo: () => {},
  handleRoundId: () => {},
};

const UserContext = createContext<UserContextType>(defaultAuthContext);

interface Props {
  children: ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const { authUser } = useAuth();
  const [userId, setUserId] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();
  const [roundId, setRoundId] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
      if (authUser) {
        const userData = await getUser(authUser.uid);
        if (!userData) {
          const newUser = await createUser({
            uid: authUser.uid,
            userName: authUser.displayName || "",
          });
          const userId = newUser?.id || "";
          handleUserId(userId);
          if (newUser?.data) {
            handleUserInfo(newUser.data);
          }
        } else {
          handleUserId(userData.id);
          handleUserInfo(userData.data as UserInfoType);
        }
      }
    };

    checkUser();
  }, []);

  const handleUserId = useCallback((userId: string) => {
    setUserId(userId);
  }, []);

  const handleUserInfo = useCallback((userInfo: UserInfoType) => {
    setUserInfo(userInfo);
  }, []);

  const handleRoundId = useCallback((roundId: string) => {
    setRoundId(roundId);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        userInfo,
        roundId,
        handleUserId,
        handleUserInfo,
        handleRoundId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfo = () => {
  return useContext(UserContext);
};

export default UserProvider;
