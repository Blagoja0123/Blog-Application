import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDG1LvBFIT1LTk-NUZ4DFztMwrvnTM1OGw",
  authDomain: "blog-app-bf9a8.firebaseapp.com",
  projectId: "blog-app-bf9a8",
  storageBucket: "blog-app-bf9a8.appspot.com",
  messagingSenderId: "912657544205",
  appId: "1:912657544205:web:fd69f437583aae5bfd9144"
};

const app = initializeApp(firebaseConfig);
export default app;