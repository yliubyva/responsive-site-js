const API_KEY = "d6b6c8500f0ded9c754b40a5b9de707e";
const apiUrl = "https://api.openweathermap.org/data/2.5/";

class WeatherAPI {
  constructor(apiKey, apiUrl) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  async fetchWeather(location) {
    const url = `${this.apiUrl}weather?q=${location}&appid=${this.apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data for ${location}`);
    }

    const data = await response.json();
    return data;
  }

  async getUVIndex(lat, lon) {
    const url = `${this.apiUrl}uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching UV index data`);
    }

    const data = await response.json();
    return data;
  }

  async getAirPollution(lat, lon) {
    const url = `${this.apiUrl}air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching air pollution data`);
    }

    const data = await response.json();
    return data;
  }

  async fetchIconWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return iconUrl;
  }

  async getWeatherForecast(lat, lon) {
    const url = `${this.apiUrl}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching weather forecast data: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  }
}

export const weatherAPI = new WeatherAPI(API_KEY, apiUrl);
