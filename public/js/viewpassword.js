document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        togglePassword.classList.toggle("bi-eye-slash-fill");
    });
});

const btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", () => {
    window.location.href = '/public/pages/overview.html'
})  