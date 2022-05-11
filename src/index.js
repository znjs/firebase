import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

// *init services
const db = getFirestore(app);

// *collection ref
const collRef = collection(db, "books");

// *get Collections
getDocs(collRef)
  .then((snapshot) => {
    console.log(snapshot);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => console.error(err));
