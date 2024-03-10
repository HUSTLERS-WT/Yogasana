import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyD5V48KcBgZ_mrDL4RFKH2NCICqR7snejg",
    authDomain: "yogasana-wt24.firebaseapp.com",
    projectId: "yogasana-wt24",
    storageBucket: "yogasana-wt24.appspot.com",
    messagingSenderId: "929507367610",
    appId: "1:929507367610:web:b6ef01e17561cf3f7dc083"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase();

const registerBtn = document.getElementById('buttoncreateacc');
const loginBtn = document.getElementById('buttongoogle');

registerBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('nameinp').value;
    const phoneNo = document.getElementById('numberinp').value;
    const age = document.getElementById('ageinp').value;
    const healthIssues = document.getElementById('healthissue-inp').value;
    // const checkbox = document.getElementById('checkbox');

    var isVerified = true;

    if (validate_field(name) == false || validate_field(phoneNo) == false|| validate_field(age) == false || validate_field(healthIssues) == false){
        window.alert("Please fill all the fields");
        isVerified = false;
        return;
    }

    if (!validate_phoneNum(phoneNo)) {
        window.alert("Invalid phone number");
        isVerified = false;
        return;
    }
    // if (!checkbox.checked) {
    //     window.alert("Please accept the terms and conditions");
    //     isVerified = false;
    //     return;
    // }


    if (isVerified) {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                const reference = ref(db, "users/" + user.uid);
                window.alert("User registered successfully");
                set(reference, {
                    name: name,
                    phoneNo: phoneNo,
                    age: age,
                    healthIssues: healthIssues,
                    last_login: Date.now(),
                })
                    .then(() => {
                        // signOut(auth)
                        window.alert("User registered successfully and data gets written to the database");
                        window.location.href = "./landin-page.html";
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + " " + errorMessage);
                        window.alert("Error: " + errorMessage);
                    });


            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " " + errorMessage);
                window.alert("Error: " + errorMessage);
            });
    }
});

loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            window.alert("Welcome Back!");
            window.location.href = "./landing-page.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
            window.alert("Error: " + errorMessage);
        });
});



//validate functions

function validate_field(field) {
    if (field == null) {
        return false;
    }
    if (field.length <= 0) {
        return false
    }
    else {
        return true;
    }
}
function validate_phoneNum(phoneNo) {
    var expression = /^\d{10}$/;
    if (expression.test(phoneNo) == true) {
        return true;
    } else {
        return false;
    }
}