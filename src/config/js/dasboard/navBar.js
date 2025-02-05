document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const paginas = {
        home: 'overview.html',
        analytics: 'dashboards.html',
        settings: 'settings.html',
        viewiot: 'additionIoT.html'
    };

    // Recupera a seção ativa do localStorage
    const activeSection = localStorage.getItem('activeSection');

    // Define a seção ativa ao carregar a página
    links.forEach(link => {
        const section = link.getAttribute('data-section');
        link.classList.toggle('active', section === activeSection);
    });

    // Adiciona evento de clique para cada link
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            // Define a nova seção ativa
            const section = link.getAttribute('data-section');
            localStorage.setItem('activeSection', section);

            // Atualiza a classe "active" nos links
            links.forEach(l => l.classList.toggle('active', l === link));

            // Redireciona para a página correspondente
            if (paginas[section]) {
                window.location.href = paginas[section];
            } else {
                console.warn('Seção não mapeada:', section);
            }
        });
    });
});
