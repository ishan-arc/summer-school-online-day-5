document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.textContent = 'Fetching weather...';

  if (!navigator.geolocation) {
    weatherResult.textContent = 'Geolocation is not supported by your browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    
    const apiKey = '7a9febd0abcc4466b2e84305250907';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Weather API error');
        }
        return response.json();
      })
      .then(data => {
        const city = data.location.name;
        const tempC = data.current.temp_c;
        const condition = data.current.condition.text;

        weatherResult.innerHTML = `
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Temperature:</strong> ${tempC} °C</p>
          <p><strong>Condition:</strong> ${condition}</p>
        `;
      })
      .catch(() => {
        weatherResult.textContent = 'Failed to fetch weather data.';
      });
  }

  function error() {
    weatherResult.textContent = 'Unable to retrieve your location.';
  }
});
