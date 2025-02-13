import { auth, db } from "../config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Captura os elementos do formulário
document.querySelector("#btnCadastrar").addEventListener("click", async () => {
    const nomeUsuario = document.querySelector("#nomeUsuario").value;
    const nomeCompleto = document.querySelector("#nomeCompleto").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    try {
        // Criar usuário no Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user; 

        // Salvar dados no Firestore na coleção "users"
        await setDoc(doc(db, "users", user.uid), {
            nomeUsuario: nomeUsuario,
            nomeCompleto: nomeCompleto,
            email: email,
            criadoEm: new Date().toISOString()
        });

        alert("Cadastro realizado com sucesso!");
        window.location.href = "/pages/login.html"; // Redireciona para login
    } catch (error) {
        alert("Erro ao cadastrar: " + error.message);
    }
});
