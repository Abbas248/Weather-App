import React, { useState } from "react";
import "./App.css";
function App() {
  const [city, setCity] = useState("");
  const [weatherList, setWeatherList] = useState([]); // ✅ multiple cards
  const [error, setError] = useState("");
  const apiKey = "964cfb1ee21036afeef94158f5b872eb";
  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return setError("⚠️ Please enter a city name.");
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      const newWeather = {
        id: Date.now(),
        name: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        wind: data.wind.speed,
      };
      setWeatherList([newWeather, ...weatherList]); // ✅ add new card on top
      setCity("");
      setError("");
    } catch {
      setError("❌ City not found or API error.");
    }
  };

  return (
    <div className="app">
      <h1>🌦️ Weather App</h1>

      <form onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Check</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="card-container">
        {weatherList.map((w) => (
          <div key={w.id} className="card">
            <h2>{w.name}</h2>
            <p>🌡️ Temp: {w.temp}°C</p>
            <p>☁️ {w.desc}</p>
            <p>💨 Wind: {w.wind} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
