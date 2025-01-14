import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherInfo } = weather;

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <h5 className="card-subtitle mb-2 text-muted">{weatherInfo[0].description}</h5>
        <p className="card-text">
          <strong>Temperature:</strong> {main.temp}°C <br />
          <strong>Humidity:</strong> {main.humidity}% <br />
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
