import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB8GNxAyrRhpS0l6RgwUE2T64Z1I2DSdP0",
  authDomain: "fir-demo-b9b5a.firebaseapp.com",
  projectId: "fir-demo-b9b5a",
  storageBucket: "fir-demo-b9b5a.appspot.com",
  messagingSenderId: "662129093377",
  appId: "1:662129093377:web:8966b61869ffce0ab98900",
};

// *initialize the firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// *init services
const db = getFirestore(app);

// *collection ref
const collRef = collection(db, "books");

// // *get Collections
// getDocs(collRef)
//   .then((snapshot) => {
//     console.log(snapshot);
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => console.error(err));

const q = query(collRef, orderBy("CreatedAt"));

// *real time data
onSnapshot(q, (snapshot) => {
  console.log(snapshot);
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});
onSnapshot(collRef, (snapshot) => {
  console.log(snapshot);
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// *get a single document

const docRef = doc(db, "books", "6WnpaNHlmi8IXWmtQqm3");
// getDoc(docRef).then((doc) => console.log(doc.data(), doc.id));

onSnapshot(docRef, (doc) => console.log(doc.data(), doc.id));

// * ADD AND DELETE DATA FROM UI
const addData = document.querySelector(".add-item");
const delData = document.querySelector(".del-item");
const updateData = document.querySelector(".update-item");

addData.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(collRef, {
    Author: addData.author.value,
    Title: addData.title.value,
    CreatedAt: serverTimestamp(),
  }).then(() => addData.reset());
});

delData.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", delData.docId.value);
  deleteDoc(docRef).then(() => delData.reset());
});

updateData.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateData.updateItem.value);
  updateDoc(docRef, {
    Title: "update title",
  }).then(() => updateData.reset());
});

const signup = document.querySelector(".signup");

signup.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, signup.email.value, signup.password.value)
    .then((res) => {
      console.log(res);
      signup.reset();
    })
    .catch((err) => console.log(err));
});
const logout = document.querySelector(".logout");

logout.addEventListener("click", () => {
  console.log("clicked logout");
  signOut(auth)
    .then(() => console.log("signed out"))
    .catch((err) => console.error(err));
});

const login = document.querySelector(".login");

login.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, login.email.value, login.password.value)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
});

// AUTH CHANGE

onAuthStateChanged(auth, (user) => {
  console.log(user);
});

// UNSUBSCRIBE FROM AUTH/DB CHANGES

const unSubscribe = document.querySelector(".unsub");

unSubscribe.addEventListener("click", () => {});
