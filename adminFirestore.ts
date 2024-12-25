import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Putter, Shot } from "./app/(tabs)";
import { RoundSettingProps } from "./app/roundSetting";

type User = {
  uid: string;
  userName: string;
};

export type UserInfoType = {
  userName: string;
  clubsUsed: string[];
  ballsUsed: string;
  createdAt: Date;
  uid: string;
};

export const getUser = async (uid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return {
      id: querySnapshot.docs[0]?.id,
      data: querySnapshot.docs[0]?.data(),
    };
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export const createUser = async (user: User) => {
  try {
    const data: UserInfoType = {
      userName: user.userName,
      clubsUsed: [
        "ドライバー",
        "4W",
        "4UT",
        "7i",
        "8i",
        "9i",
        "PW",
        "SW",
        "パター",
      ],
      ballsUsed: "HONMA D1",
      createdAt: new Date(),
      uid: user.uid,
    };
    const docRef = await addDoc(collection(db, "users"), data);
    return { id: docRef.id, data };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserInfo = async (id: string) => {
  try {
    const docRef = await getDoc(doc(db, "users", id));
    console.log(docRef.data());
    return docRef.data();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addShot = async (userId: string, shot: Shot, roundId: string) => {
  try {
    const docRef = await addDoc(collection(db, "shots"), {
      userId: userId,
      ...shot,
      createdAt: new Date(),
      roundId: roundId,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addPutter = async (
  userId: string,
  putter: Putter,
  roundId: string
) => {
  try {
    const docRef = await addDoc(collection(db, "putters"), {
      userId: userId,
      ...putter,
      createdAt: new Date(),
      roundId: roundId,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addRoundSetting = async (
  userId: string,
  roundSetting: RoundSettingProps
) => {
  try {
    const docRef = await addDoc(collection(db, "roundSettings"), {
      userId: userId,
      ...roundSetting,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getShotsInRound = async (roundId: string, userId: string) => {
  try {
    const q = query(
      collection(db, "shots"),
      where("roundId", "==", roundId),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data()) as Shot[];
    const sortedResult = result.sort((a, b) => {
      if (a.hole === b.hole) {
        return a.strokes - b.strokes;
      }
      return a.hole - b.hole;
    });
    return sortedResult;
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};
