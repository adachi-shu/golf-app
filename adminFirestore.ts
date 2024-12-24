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

type User = {
  uid: string;
  userName: string;
};

export const getUser = async (uid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]?.id;
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

export const createUser = async (user: User) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
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
    });
    return docRef.id;
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

export const addShot = async (userId: string, shot: Shot) => {
  try {
    const docRef = await addDoc(collection(db, "shots"), {
      userId: userId,
      ...shot,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addPutter = async (userId: string, putter: Putter) => {
  try {
    const docRef = await addDoc(collection(db, "putters"), {
      userId: userId,
      ...putter,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
