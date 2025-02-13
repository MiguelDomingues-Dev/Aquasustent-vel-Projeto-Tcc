const daysContainer = document.getElementById('daysContainer');
    const currentMonth = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let date = new Date();

    function renderCalendar() {
        daysContainer.innerHTML = ''; // Limpa os dias antigos
        const month = date.getMonth();
        const year = date.getFullYear();

        currentMonth.innerText = new Intl.DateTimeFormat('pt-BR', {
            month: 'long',
            year: 'numeric'
        }).format(date);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        // Preenche os dias do mês
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysContainer.innerHTML += `<div></div>`; // Espaço vazio
        }
        for (let day = 1; day <= lastDateOfMonth; day++) {
            daysContainer.innerHTML += `<div class="day" onclick="updateCharts(${day})">${day}</div>`;
        }
    }

    function changeMonth(direction) {
        date.setMonth(date.getMonth() + direction);
        renderCalendar();
        updateCharts(); // Atualiza os gráficos ao mudar o mês
    }

    function updateCharts(day = null) {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        console.log(`Atualizando gráficos para o mês ${month}/${year}`);
        if (day) {
            console.log(`Dia selecionado: ${day}`);
        }
        // Atualiza os gráficos (simulação com novos dados)
        chart1.data.datasets[0].data = [10, 20, 30, 40, Math.random() * 50];
        chart2.data.datasets[0].data = [50, Math.random() * 50, 20, 40, 10];
        chart3.data.datasets[0].data = [15, 30, Math.random() * 50, 10, 5];

        chart1.update();
        chart2.update();
        chart3.update();
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    renderCalendar();

    // Configuração dos gráficos
    const ctx1 = document.getElementById('chart1').getContext('2d');
    const chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Consumo Mensal $/L',
                data: [10, 20, 30, 40, 50],
                backgroundColor: '#00B21B'
            }]
        }
    });

    const ctx2 = document.getElementById('chart2').getContext('2d');
    const chart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Gasto Semanal',
                data: [50, 40, 30, 20, 10],
                borderColor: '#00B21B',
                fill: false
            }]
        }
    });

    const ctx3 = document.getElementById('chart3').getContext('2d');
const chart3 = new Chart(ctx3, {
    type: 'line', // ou 'bar', 'pie', etc.
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        datasets: [{
            label: 'Consumo Anual $/L',
            data: [12, 19, 3, 5, 2],
            borderColor: '#00b21b',
            borderWidth: 4,
            backgroundColor: '#04500f'
        }]
    },
    options: {
        scales: {
            x: {
                grid: {
                    color: 'rgb(255, 255, 255)', // Cor das grades do eixo X
                    lineWidth: 1, // Espessura das linhas do grid
                    borderColor: 'rgb(67, 225, 10)' // Cor da borda
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.98)', // Cor das grades do eixo Y
                    lineWidth: 2, // Espessura das linhas do grid
                    borderColor: 'rgb(0, 178, 27))' // Cor da borda
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});