document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    
    // Recupera a seção salva no localStorage (se existir)
    const activeSection = localStorage.getItem('activeSection');
    
    if (activeSection) {
        links.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === activeSection) {
                link.classList.add('active'); // Aplica classe ao link salvo
            } else {
                link.classList.remove('active'); // Remove de outros links
            }
        });
    }

    // Adiciona evento de clique aos links
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Previne comportamento padrão do link

            // Remove a classe "active" de todos os links
            links.forEach(l => l.classList.remove('active'));

            // Adiciona a classe "active" ao link clicado
            link.classList.add('active');

            // Salva a seção no localStorage
            const section = link.getAttribute('data-section');
            localStorage.setItem('activeSection', section);

            // Redireciona para a página correspondente
            const paginas = {
                home: 'overview.html',
                analytics: 'dashboards.html',
                settings: 'settings.html',
                profile: 'profile.html',
                logout: 'logout.html'
            };

            if (paginas[section]) {
                window.location.href = paginas[section];
            } else {
                console.warn('Seção não mapeada:', section);
            }
        });
    });
});
