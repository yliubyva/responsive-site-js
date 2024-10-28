import { createContext, useEffect, useState, useContext } from "react";
import { weatherAPI } from "../api/weatherApi";
import PropTypes from "prop-types";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [currentWeather, setCurrentWeather] =useState(null);
    const [currentLocation, setCurrentLocation] = useState('Kyiv');
    const [lastFetchedLocation, setLastFetchedLocation] = useState(null);

    const fetchWeatherData = async (location = 'Kyiv') => {
        if (currentWeather && currentWeather.name.toLowerCase() === location.toLowerCase()) {
            return; 
        }
    
        try {
            const currentWeatherData = await weatherAPI.fetchWeather(location);
            if (currentWeatherData && currentWeatherData.weather && currentWeatherData.main) {
                setCurrentWeather(currentWeatherData);
                setCurrentLocation(location);
                setLastFetchedLocation(location);
                return currentWeatherData;
            } else {
                console.error("Invalid weather data structure:", currentWeatherData);
                return null;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    useEffect(() => {
        fetchWeatherData(currentLocation);
    }, []);
    
    return (
        <WeatherContext.Provider value={{ currentWeather, currentLocation, fetchWeatherData }}>
            {children}
        </WeatherContext.Provider>
    );
};

WeatherProvider.propTypes = {
    children: PropTypes.node,
}

export const useWeather = () => useContext(WeatherContext);