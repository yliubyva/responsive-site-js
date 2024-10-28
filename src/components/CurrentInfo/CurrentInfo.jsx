import { useEffect, useState } from "react";
import { weatherAPI } from "../../api/weatherApi";
import { BackgroundContainer } from "../BackgroundContainer/BackgroundContainer";
import { InfoCard } from "../InfoCard/InfoCard";
import { useParams } from "react-router-dom";
import { useWeather } from "../../context/WeatherContext";
import ArrowUpIcon from "../../assets/ArrowUp.svg?react";
import ArrowDownIcon from "../../assets/ArrowDown.svg?react";
import HumidityIcon from "../../assets/Humidity.svg?react";
import FeelsIcon from "../../assets/Feels.svg?react";
import WindIcon from "../../assets/Wind.svg?react";
import ArrowsIcon from "../../assets/Arrows.svg?react";
import SunblockIcon from "../../assets/Sunblock.svg?react";
import styles from "./CurrentInfo.module.css";

export const CurrentInfo = () => {
    const { currentWeather, currentLocation, fetchWeatherData } = useWeather();
    const { location } = useParams();
    const [iconWeather, setIconWeather] = useState('');
    const [uvIndex, setUVIndex] = useState(null);

    const fetchUVIndex = async (lat, lon) => {
        try {
            const uvData = await weatherAPI.getUVIndex(lat, lon);
            setUVIndex(uvData.value);
        } catch (error) {
            console.error("Error fetching UV Index:", error);
        }
    };
    
    useEffect(() => {
        if (location && (!currentWeather || currentWeather.name !== location)) {
            fetchWeatherData(location);
        }
    }, [location, fetchWeatherData, currentWeather]);

    useEffect(() => {
        if (currentWeather) {
            const fetchIcon = async () => {
                const icon = await weatherAPI.fetchIconWeather(currentWeather);
                setIconWeather(icon);
            };

            fetchIcon();

            const { lat, lon } = currentWeather.coord;
            if (lat && lon) {
                fetchUVIndex(lat, lon);
            }
        }
    }, [currentWeather]);


    const convertWindSpeedToKmH = (speedInMetersPerSecond) => {
        const convertedWind = speedInMetersPerSecond * 3.6;
        return convertedWind.toFixed(2);
    }

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.currentInfo}>
                    <h2>
                        {currentLocation}
                    </h2>
                    {currentWeather ? (
                        <div>
                            <p className={styles.temp}>
                                {Math.round(currentWeather.main.temp)}
                                <span className={styles.degree}>°C</span>
                            </p>

                            <div className={styles.description}>
                                {iconWeather && <img className={styles.icon} src={iconWeather} alt="icon weather" />}
                                <p>{currentWeather.weather[0].description}</p>
                            </div>

                            <div className={styles.tempRange}>
                                <BackgroundContainer>
                                    <div className={`icon-group ${styles.range}`}>
                                        <ArrowUpIcon />
                                        <p>{Math.round(currentWeather.main.temp_max)}
                                            <span>°C</span>
                                        </p>
                                    </div>
                                </BackgroundContainer>
                                <BackgroundContainer>
                                    <div className={`icon-group ${styles.range}`}>
                                        <ArrowDownIcon />
                                        <p>{Math.round(currentWeather.main.temp_min)}
                                            <span>°C</span>
                                        </p>
                                    </div>
                                </BackgroundContainer>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                {currentWeather && (
                    <div className={styles.cardGrid}>
                        <div className={styles.card}>
                            <InfoCard>
                                <div className="icon-group">
                                    <HumidityIcon className="icon" />
                                    <span>Humidity</span>
                                </div>
                                <span>{currentWeather.main.humidity}%</span>
                            </InfoCard>
                        </div>
                        <div className={styles.card}>
                            <InfoCard>
                                <div className="icon-group">
                                    <FeelsIcon className="icon" />
                                    <span>Feels like</span>
                                </div>
                                <p>
                                    {Math.round(currentWeather.main.feels_like)}
                                    <span>°C</span>
                                </p>
                            </InfoCard>
                        </div>

                        <div className={styles.card}>
                            <InfoCard>
                                <div className="icon-group">
                                    <WindIcon className="icon" />
                                    <span>Wind speed</span>
                                </div>
                                <p>
                                    {convertWindSpeedToKmH(currentWeather.wind.speed)}
                                    <span> km/h</span>
                                </p>
                            </InfoCard>
                        </div>
                        <div className={styles.card}>
                            <InfoCard>
                                <div className="icon-group">
                                    <ArrowsIcon className="icon" />
                                    <span>Pressure</span>
                                </div>
                                <p>
                                    {currentWeather.main.pressure}
                                    <span> hPa</span>
                                </p>
                            </InfoCard>
                        </div>
                        <div className={styles.card}>
                            <InfoCard>
                                <div className="icon-group">
                                    <SunblockIcon className="icon" />
                                    <span>UV Index</span>
                                </div>
                                <p>
                                    {uvIndex !== null ? uvIndex : 'Loading...'}
                                </p>
                            </InfoCard>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}