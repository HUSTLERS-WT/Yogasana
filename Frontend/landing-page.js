import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJFHn3IUW4aw0uZ7MHZ8sV6w0Yn1sxGoU",
    authDomain: "share2-care.firebaseapp.com",
    databaseURL: "https://share2-care-default-rtdb.firebaseio.com",
    projectId: "share2-care",
    storageBucket: "share2-care.appspot.com",
    messagingSenderId: "1067321624993",
    appId: "1:1067321624993:web:21d3825670c60b4e16e3e0"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  

//logout button
const logoutBtn = document.getElementById('sign-out1');
logoutBtn.addEventListener('click', function (event) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // window.alert("You are not login. Please login or create an account to continue.");
      window.location.href = "res/signup.html";
    }
    else {
      signOut(auth)
        .then(() => {
          // window.location.href = "./../index.html";
          // window.location.reload(true);
          window.alert("You have been logged out.");
          // window.location.href = "res/signup.html";
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });


})