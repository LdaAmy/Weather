function updateBackground(data) {
    var weatherMap = {
        'Clear': 'clearSky.png',
        'Clouds': 'brokenClouds.png',
        'Drizzle': 'drizzle.png',
        'Rain': 'rain.png',
        'Thunderstorm': 'thunderStorm.png',
        'Snow': 'snow.png',
        'Mist': 'mist.png',
        'Smoke': 'ash.png',
        'Haze': 'dust.png',
        'Dust': 'dust.png',
        'Fog': 'mist.png',
        'Sand': 'sand.png',
        'Ash': 'ash.png',
        'Squall': 'squall.png',
        'Tornado': 'tornado.png'
    };

    var weatherType = data.weather[0].main; // Pega o tipo principal do clima
    var imageUrl = `img/${weatherMap[weatherType]}`; // Constrói o caminho para a imagem com base no tipo de clima
    $('#foto-weather').css('background-image', `url('${imageUrl}')`); // Muda a imagem de fundo
}

function getWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c5497c5cda9dd4f4ac4a9652fd7c1793&units=metric&lang=pt_br`;

    $.getJSON(url, function(data) {
        console.log(data); // Exibir os dados no console para depuração
        updateBackground(data); // Atualiza o fundo com base no clima obtido

        // Atualizando a interface com os dados do clima
        $('#foto-weather h1').text(data.name); // Nome da cidade
        $('#infos').html(`
            <div class="w-100 d-flex" style="flex-direction: row; justify-content: space-between; margin-top: 40px;">
<h3>temperature</h3>
                <h3>thermal sensation</h3>
                <h3>
humidity</h3>
                <h3>wind speed</h3>
                <h3>sunrise/
sunset</h3>
            </div>
            <div class="d-flex m-3" style="justify-content: space-between; flex-direction: row;">
                <p>Min: ${data.main.temp_min}°C Max: ${data.main.temp_max}°C</p>
                <p>${data.main.temp}°C</p>
                <p>humidity: ${data.main.humidity}%</p>
                <p>wind: ${data.wind.speed} km/h</p>
                <p>sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        `);
    });
}

// Função para pegar a geolocalização do navegador
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon); // Chama a função de clima com a posição atual
        }, function(error) {
            alert('Erro ao obter localização. Verifique suas permissões.');
        });
    } else {
        alert('Geolocalização não é suportada pelo navegador.');
    }
}

// Chamando a função para pegar a localização ao carregar a página
$(document).ready(function() {
    getLocation();
});
