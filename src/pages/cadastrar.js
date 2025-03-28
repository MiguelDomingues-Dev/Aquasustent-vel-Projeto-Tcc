// Importa o Firebase (como está no node_modules, precisa ser chamado via módulo)
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Configuração do Firebase (substitua pelos dados do seu projeto)
const firebaseConfig = {
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função para cadastrar novo usuário// Função para cadastrar novo usuário
document.getElementById("registerButton").addEventListener("click", async () => {
    const user = document.getElementById("user").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (user === "" || nome === "" || email === "" || password === "") {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "/public/pages/additionIoT.html"; // Redireciona para o login
    } catch (error) {
        alert("Erro ao cadastrar usuário: " + error.message);
    }
});
