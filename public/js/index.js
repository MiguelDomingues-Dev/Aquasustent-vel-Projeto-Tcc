document.querySelectorAll(".card").forEach((button) => {
    button.addEventListener("click", (e) => {
        const card = e.target.closest(".plan-card");
        const overlay = document.getElementById("overlay");

      // Remove a classe ativa de outros cards
        document.querySelectorAll(".plan-card").forEach((c) => c.classList.remove("active"));

      // Ativa o card clicado
        card.classList.add("active");
        overlay.classList.add("active");

      // Fechar o card clicado ao clicar fora
        overlay.addEventListener("click", () => {
        card.classList.remove("active");
        overlay.classList.remove("active");
        });
    });
});
