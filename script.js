
class Weather {
    constructor(city) {
      this.apiKey = '12728d5860d23af28fd329b769a9afe0'; // Replace with your actual OpenWeatherMap API key
      this.city = city;
    }
  
    async fetchWeather() {// using async await instead of fetch to make the operation synchronous
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);
      const data = await response.json();// returns promise waiting to be executed
      return data;// returns object
    }
  
    render(weatherData) {
      const weatherResult = document.getElementById('result');
        console.log(weatherData);
      if (weatherData.cod === 200) {// not using try and catch checking if the code works or not through it 
        weatherResult.innerHTML = `
          <h2 style="color:#8c52ff;">${weatherData.name}</h2>
          <p>Temperature: ${weatherData.main.temp}°F</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
          <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        `;
      } else {
        weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
      }
    }
  }
  
 
    document.getElementById('form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const city = document.getElementById('text').value;
      const weather = new Weather(city);
      const weatherData = await weather.fetchWeather();// waiting for this operation to take place
      weather.render(weatherData);
    });

 