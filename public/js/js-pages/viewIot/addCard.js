document.addEventListener("DOMContentLoaded", function () {
    const btnAddition = document.getElementById("btnAddition");
    const cardContainer = document.getElementById("cardContainer");

    // Inputs de exemplo (no seu caso, cada etapa terá seus inputs)
    const nameIot = document.getElementById("nameIot");
    // Se tiver mais inputs nas etapas, crie variáveis para eles também

    // Ao clicar no botão + central, abre o primeiro modal (Etapa 1)
    btnAddition.addEventListener("click", () => {
      // Se quiser abrir o modal via JavaScript:
        const btnContinue1 = document.querySelector("#btnContinuarAdd");
        const btnContinue2 = document.querySelector("#btnContinuarAdd2");
        const btnContinue3 = document.querySelector("#btnContinuarAdd3");
        const btnContinue4 = document.querySelector("#addCardBtn");

        // Referências para os modais
        const modal1Element = document.querySelector("#espacoModal1");
        const modal2Element = document.querySelector("#espacoModal2");
        const modal3Element = document.querySelector("#espacoModal3");
        const modal4Element = document.querySelector("#espacoModal4");

        const modal1 = new bootstrap.Modal(modal1Element);
        const modal2 = new bootstrap.Modal(modal2Element);
        const modal3 = new bootstrap.Modal(modal3Element);
        const modal4 = new bootstrap.Modal(modal4Element);

        // Evento para trocar Modal 1 → Modal 2
        btnContinue1.addEventListener("click", () => {
            modal1.hide();
            setTimeout(() => modal2.show(), 500);
        });

        // Evento para trocar Modal 2 → Modal 3
        btnContinue2.addEventListener("click", () => {
            modal2.hide();
            setTimeout(() => modal3.show(), 500);
        });

        // Evento para trocar Modal 3 → Modal 4
        btnContinue3.addEventListener("click", () => {
            modal3.hide();
            setTimeout(() => modal4.show(), 500);
        });

        // Evento para fechar o modal 4
        btnContinue4.addEventListener("click", () => {
            modal4.hide();
        })
    });

    // Verifica se já existem cards salvos no localStorage
    function getSavedCards() {
        return JSON.parse(localStorage.getItem("iotCards")) || [];
    }

    // Salva no localStorage
    function saveCards(cards) {
        localStorage.setItem("iotCards", JSON.stringify(cards));
    }

    // Renderiza todos os cards na tela
    function renderCards() {
        const cards = getSavedCards();
        cardContainer.innerHTML = "";

        cards.forEach((card) => {
            // Cria o elemento do card
            const cardEl = document.createElement("div");
            cardEl.classList.add("card-iot");
            cardEl.setAttribute("data-id", card.id);

            cardEl.innerHTML = `
            <div id="container-card">
            <div class="card-header">
            <p>${card.number}</p>
            <button class="delete-btn">x</button>
            </div>
            <img src="${card.image || '/public/images/img-fundo-card.png'}" alt="Imagem do Dispositivo">
            <div class="card-body">
            <span class="info-card">
            <h4>${card.nome || 'Sem nome'}</h4>
            <p>ID: ${card.id}</p>
            </span>
                <button class="btnOn"><i class="bi bi-power"></i></button>
            </div>
            `;

            // Botão de remover
            const deleteBtn = cardEl.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => {
                removeCard(card.id);
            });

            cardContainer.appendChild(cardEl);
        });
    }

    // Adiciona um novo card (chamado quando clicar no botão "Criar Dispositivo" da última etapa)
    function addNewCard(nome, image) {
        const cards = getSavedCards();
        const cardNumber = cards.length + 1;
        const formattedNumber = String(cardNumber).padStart(2, "0");      
        const newCard = {
            id: Date.now().toString(),
            nome: nome,
            image: image,
            number: formattedNumber
        };
        cards.push(newCard);
        saveCards(cards);
        renderCards();
        checkPlusBtn(); // Verifica se precisa mover o botão +
    }

    // Remove um card
    function removeCard(cardId) {
        const cards = getSavedCards();
        const filtered = cards.filter((c) => c.id !== cardId);
        saveCards(filtered);
        renderCards();
        checkPlusBtn(); // Verifica se precisa reposicionar o botão +
    }

    // Verifica se existe algum card. Se sim, move o + para o canto; senão, deixa central
    function checkPlusBtn() {
        const cards = getSavedCards();
        if (cards.length > 0) {
            btnAddition.classList.remove("plus-centered");
            btnAddition.classList.add("plus-corner");
        } else {
            btnAddition.classList.remove("plus-corner");
            btnAddition.classList.add("plus-centered");
        }
    }

    // Evento do botão final (Etapa 4/4) para criar o card
    const btnCriarCard = document.getElementById("addCardBtn");
    btnCriarCard.addEventListener("click", () => {
        // Aqui você coleta os dados dos inputs das etapas
        // Por exemplo, só estamos pegando o nome:
        const nomeDispositivo = nameIot.value.trim() || "Dispositivo IoT";

        // Caso tenha mais inputs (etapa2, etapa3, etc.), pegue aqui
        // Exemplo:
        // const imageUrl = inputImagem.value; // se tiver
        // Se não tiver imagem, usar um placeholder

        addNewCard(nomeDispositivo, "");
    });

    // Ao carregar a página, renderiza os cards e posiciona o + corretamente
    renderCards();
    checkPlusBtn();
});