import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchForm from "./components/SearchForm";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import HourlyForecastChart from "./components/HourlyForecastChart";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [unit, setUnit] = useState("metric");
  const [lastSearch, setLastSearch] = useState(null); // Tracks the last searched city or location

  const API_KEY = "2620f4025518c9b33e2a759b1882da8c";

  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationSearch(latitude, longitude);
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Function to toggle units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  // Fetch weather data based on latitude and longitude
  const handleLocationSearch = async (lat, lon) => {
    try {
      setError(null);
      setLastSearch({ type: "location", lat, lon }); // Store the coordinates as the last search

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error("Error fetching weather data");

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) throw new Error("Error fetching forecast data");

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Process 5-day forecast
      const dailyData = [];
      const tempMap = {};

      forecastData.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        const time = entry.dt_txt.split(" ")[1].substring(0, 5); // Get time

        if (!tempMap[date]) {
          tempMap[date] = {
            max: -Infinity,
            min: Infinity,
            hourly: [],
          };
        }

        tempMap[date].max = Math.max(tempMap[date].max, entry.main.temp_max);
        tempMap[date].min = Math.min(tempMap[date].min, entry.main.temp_min);
        tempMap[date].hourly.push({
          time,
          temp: entry.main.temp,
        });
      });

      for (const date in tempMap) {
        dailyData.push({
          date,
          max: tempMap[date].max,
          min: tempMap[date].min,
          icon: forecastData.list.find((entry) =>
            entry.dt_txt.startsWith(date)
          ).weather[0].icon,
          description: forecastData.list.find((entry) =>
            entry.dt_txt.startsWith(date)
          ).weather[0].description,
          hourly: tempMap[date].hourly,
        });
      }

      setWeather(weatherData);
      setForecast(dailyData);
      setHourlyData(dailyData[0]?.hourly || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = async (city) => {
    try {
      setError(null);
      setLastSearch({ type: "city", city }); // Store the city name as the last search

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error("City not found");

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) throw new Error("Error fetching forecast data");

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // Process 5-day forecast
      const dailyData = [];
      const tempMap = {};

      forecastData.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        const time = entry.dt_txt.split(" ")[1].substring(0, 5); // Get time

        if (!tempMap[date]) {
          tempMap[date] = {
            max: -Infinity,
            min: Infinity,
            hourly: [],
          };
        }

        tempMap[date].max = Math.max(tempMap[date].max, entry.main.temp_max);
        tempMap[date].min = Math.min(tempMap[date].min, entry.main.temp_min);
        tempMap[date].hourly.push({
          time,
          temp: entry.main.temp,
        });
      });

      for (const date in tempMap) {
        dailyData.push({
          date,
          max: tempMap[date].max,
          min: tempMap[date].min,
          icon: forecastData.list.find((entry) =>
            entry.dt_txt.startsWith(date)
          ).weather[0].icon,
          description: forecastData.list.find((entry) =>
            entry.dt_txt.startsWith(date)
          ).weather[0].description,
          hourly: tempMap[date].hourly,
        });
      }

      setWeather(weatherData);
      setForecast(dailyData);
      setHourlyData(dailyData[0]?.hourly || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDaySelect = (dayIndex) => {
    setHourlyData(forecast[dayIndex]?.hourly || []);
    setSelectedDay(dayIndex);
  };

  useEffect(() => {
    getLocation(); // Call getLocation on component mount to get user's location
  }, []);

  useEffect(() => {
    if (lastSearch) {
      if (lastSearch.type === "city") {
        handleSearch(lastSearch.city); // Refetch data for the last searched city
      } else if (lastSearch.type === "location") {
        handleLocationSearch(lastSearch.lat, lastSearch.lon); // Refetch data for the last searched location
      }
    }
  }, [unit]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <SearchForm onSearch={handleSearch} />
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        <div className="form-check form-switch mt-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="unitToggle"
            checked={unit === "imperial"}
            onChange={toggleUnit}
          />
          <label className="form-check-label" htmlFor="unitToggle">
            {unit === "metric" ? "°C" : "°F"}
          </label>
        </div>

        <CurrentWeather weather={weather} units={unit} />

        <FiveDayForecast
          forecast={forecast}
          onDaySelect={handleDaySelect}
          selectedDay={selectedDay}
          units={unit}
        />
        <HourlyForecastChart hourlyData={hourlyData} units={unit} />
      </div>
    </div>
  );
};

export default App;
