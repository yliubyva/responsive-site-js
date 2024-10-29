import { useParams } from "react-router-dom";
import styles from "./SecondaryInfo.module.css";
import { useWeather } from "../../context/WeatherContext";
import { useEffect, useState } from "react";
import { weatherAPI } from "../../api/weatherAPI";

export const SecondaryInfo = () => {
    const { currentWeather, currentLocation, fetchWeatherData } = useWeather();
    const { location } = useParams();
    const [forecastWeather, setForecastWeather] = useState(null);

    const fetchWeatherForecast = async (lat, lon) => {
        try {
            const forecastData = await weatherAPI.getWeatherForecast(lat, lon);
            setForecastWeather(forecastData);
        } catch (error) {
            console.error("Error fetching forecast weather:", error);
        }
    };

    useEffect(() => {
        if (location && (!currentWeather || currentWeather.name !== location)) {
            fetchWeatherData(location);
        }
    }, [location, fetchWeatherData, currentWeather]);
    

    useEffect(() => {
        if (currentWeather && !forecastWeather) {
            const { lat, lon } = currentWeather.coord;
            if (lat && lon) {
                fetchWeatherForecast(lat, lon);
            }
        }
    }, [currentWeather, forecastWeather]);

    const groupByDate = (list) => {
        return list.reduce((acc, forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString(); 
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(forecast);
            return acc;
        }, {});
    };

    return (
        <section>
            <div className={styles.container}>
                <h2 className={styles.title}>{currentLocation}</h2>
                {forecastWeather ? (
                    <ul className={styles.list}>
                        {Object.entries(groupByDate(forecastWeather.list)).map(([date, forecasts]) => (
                            <li key={date} className={styles.day}>
                                <h3 className={styles.date}>{date}</h3>
                                <ul className={styles.details}>
                                    {forecasts.map((forecast, index) => (
                                        <li key={index} className={styles.item}>
                                            <p>{new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                            <p>{Math.round(forecast.main.temp)}°C</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading forecast...</p>
                )}
            </div>
        </section>
    );
};