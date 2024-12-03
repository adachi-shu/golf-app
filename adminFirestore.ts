import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      userName: "adc",
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
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserInfo = async () => {
  try {
    const docRef = await getDoc(doc(db, "users", "eQqYHrrjTL5quX6Pf7rq"));
    console.log(docRef.data());
    return docRef.data();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
