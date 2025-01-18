import React from "react";

const FiveDayForecast = ({ forecast, onDaySelect, selectedDay, units }) => {
    if (!forecast.length) return null;
    const unitsSymbol = units === "metric" ? "°C" : "°F";
    return (
        <div
            className="d-flex overflow-auto mt-4 justify-content-sm-start justify-content-lg-center align-items-center p-4"
        >

            {forecast.map((day, index) => (
                <div
                    key={index}
                    className={`card text-center mx-2 ${selectedDay === index ? "selected-card" : ""
                        }`}
                    style={{
                        minWidth: "120px",
                        cursor: "pointer",
                        transform: selectedDay === index ? "translateY(-10px)" : "none",
                        transition: "transform 0.3s, border-color 0.3s",
                        border: selectedDay === index ? "2px solid orange" : "1px solid #ddd",
                    }}
                    onClick={() => onDaySelect(index)}
                >
                    <div className="card-body">
                        <h6 style={{ color: "orange" }}>{day.date}</h6>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                            alt={day.description}
                            style={{ width: "50px", height: "50px", objectFit: "contain" }}
                        />                        
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                            <div><strong style={{ color: "orange" }}>{day.max.toFixed(1)}{unitsSymbol}</strong></div>
                            <div>{day.min.toFixed(1)}{unitsSymbol}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FiveDayForecast;
