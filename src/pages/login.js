import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

document.getElementById("btnLogin").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login realizado com sucesso!");
        window.location.href = "/public/pages/additionIoT.html"; // Redireciona para a página da dashboard
    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
    }
});