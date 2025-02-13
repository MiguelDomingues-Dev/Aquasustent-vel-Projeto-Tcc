import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Se não estiver autenticado, redireciona para login
        window.location.href = "/public/pages/login.html";
    }
});
