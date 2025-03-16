const API_KEY = ''; // Substitua por sua API Key do OpenWeatherMap
    const CITY = 'Itaberá, BR';

    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=pt_br&appid=${API_KEY}`);
            const data = await response.json();

            // Atualiza o local
            document.getElementById('city').innerText = data.city.name;

            // Atualiza a temperatura atual
            document.getElementById('current-temp').innerText = `${Math.round(data.list[0].main.temp)}°C`;
            document.getElementById('temp-max').innerText = `${Math.round(data.list[0].main.temp_max)}°`;
            document.getElementById('temp-min').innerText = `${Math.round(data.list[0].main.temp_min)}°`;

            // Previsões
            document.getElementById('forecast1').innerText = `${Math.round(data.list[8].main.temp)}° ${Math.round(data.list[8].main.temp_min)}°`;
            document.getElementById('forecast2').innerText = `${Math.round(data.list[16].main.temp)}° ${Math.round(data.list[16].main.temp_min)}°`;
            document.getElementById('forecast3').innerText = `${Math.round(data.list[24].main.temp)}° ${Math.round(data.list[24].main.temp_min)}°`;

            // Alerta Simples
            const temp = Math.round(data.list[0].main.temp);
            if (temp > 30) {
                document.getElementById('alert-text').innerText = 'TEMPERATURA MUITO ELEVADA';
                document.querySelector('#alert span').innerText = 'Cuidado: alta temperatura pode aumentar o consumo!';
            } else {
                document.getElementById('alert-text').innerText = 'TEMPERATURA ESTÁVEL';
                document.querySelector('#alert span').innerText = 'Temperatura dentro da normalidade.';
            }
        } catch (error) {
            console.error('Erro ao buscar dados climáticos', error);
        }
    }

    // Chama a função ao carregar a página
    fetchWeather();