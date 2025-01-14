import React from "react";

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: weatherInfo } = weather;
  const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`;
  const description = weatherInfo[0].description;

  return (
    <div
      className="card text-center mt-4"
      style={{
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(to bottom right, #ff7e5f, #feb47b)",
      }}
    >
      <div className="card-body text-white">
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>{name}</h2>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "700" }}>
          {main.temp.toFixed(1)}°C
        </h1>
        <div className="my-3">
          <img
            src={iconUrl}
            alt={description}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "contain",
            }}
          />
        </div>
        <h5 className="text-muted" style={{ fontSize: "1.2rem" }}>
          {description}
        </h5>
        <div className="my-3">
          <strong>Humidity:</strong>{" "}
          <span style={{ fontSize: "1.2rem" }}>{main.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
