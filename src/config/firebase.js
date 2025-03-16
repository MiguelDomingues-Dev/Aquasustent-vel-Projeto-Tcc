 // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword,setPersistence, browserLocalPersistence, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const cadastrarBtn = document.querySelector("#btnCadastrar");
    if (cadastrarBtn) {
        cadastrarBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const nameUser = document.querySelector("#user").value;
            const nomeCompleto = document.querySelector("#nome").value;
            const email = document.querySelector("#email").value;
            const password = document.querySelector("#password").value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                const userData = { email, nameUser, nomeCompleto };

                alert("Conta Criada com SUCESSO!");

                await setDoc(doc(db, "usuarios", user.uid), userData);
                console.log("Usuário cadastrado com sucesso!");
                window.location.href = "/public/pages/overview.html";
            } catch (error) {
                console.error("Erro:", error);
                if (error.code === "auth/email-already-in-use") {
                    alert("E-mail já existe");
                } else {
                    alert("Impossível criar o usuário");
                }
            }
        });
    }
    
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário logado:", user.uid);
        localStorage.setItem("loggedInUserId", user.uid);
        window.location.href = "/public/pages/overview.html";
    })
    .catch((error) => {
        console.error("Erro ao logar:", error);
    });

    const btnLogin = document.querySelector("#btnLogin");
    if (btnLogin) {
        btnLogin.addEventListener("click", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User logged in:", user.uid); // Verifica o ID no console
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = "/public/pages/overview.html";
            } catch (error) {
                console.error("Erro:", error);
                if (error.code === "auth/wrong-password") {
                    alert("Senha incorreta.");
                } else if (error.code === "auth/user-not-found") {
                    alert("Usuário não encontrado.");
                } else {
                    alert("Erro ao fazer login: " + error.message);
                }
            }
        });
    }
});