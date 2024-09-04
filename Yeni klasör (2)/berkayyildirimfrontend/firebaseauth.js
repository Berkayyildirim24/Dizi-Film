
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDR05RC4GkNq6tzDjECnJTrW9MjfgYNL0E",
    authDomain: "login-form-86004.firebaseapp.com",
    projectId: "login-form-86004",
    storageBucket: "login-form-86004.appspot.com",
    messagingSenderId: "582086181580",
    appId: "1:582086181580:web:075e9f03fbeebf199b7869"
};
//  Firebase Başlatma
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        
        // Kullanıcı adı ve soyadı eklemek
        updateProfile(user, {
            displayName: `${firstName} ${lastName}`
        }).then(() => {
            console.log('Kullanıcı adı güncellendi.');
        }).catch((error) => {
            console.error("Kullanıcı adı güncellenemedi: ", error);
        });

        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName 
        };
        showMessage('Hesap Başarıyla Oluşturuldu', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error("error writing document", error);
        }); 
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            showMessage('E-posta Adresi Zaten Var !!!', 'signUpMessage');
        } else {
            showMessage('Kullanıcı oluşturulamıyor', 'signUpMessage');
        }  
    }); 
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Giriş Başarılı', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'index.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Yanlış E-posta veya Şifre', 'signInMessage');
        } else {
            showMessage('Kullanıcı adı veya şifre hatalı!', 'signInMessage');
        }
    }); 
});

// Kullanıcı oturum açma durumunu kontrol etme
onAuthStateChanged(auth, (user) => {
    if (user) {   // Kullanıcı giriş yaptı
        document.getElementById('sourceContainer').style.display = 'block';
        document.getElementById('targetContainer').style.display = 'block';
    } else {  // Kullanıcı giriş yapmadı
        document.getElementById('sourceContainer').style.display = 'none';
        document.getElementById('targetContainer').style.display = 'none'; 
    }
});
