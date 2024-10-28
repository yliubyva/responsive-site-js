import styles from "./Search.module.css";
import SearchIcon from "../../assets/Search.svg?react";
import { useState } from "react";
import { useWeather } from "../../context/WeatherContext";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { fetchWeatherData } = useWeather();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (searchTerm.trim() === '') {
            setErrorMessage('Please enter a location.');
            return;
        }

        try {
            const data = await fetchWeatherData(searchTerm);
            if (data === null) {
                throw new Error('Location not found'); 
            }    
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setErrorMessage("Location not found. Please check the spelling or try a different location.");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="search"
                    className={styles.input}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Enter your city"
                />
                <button type="submit" className={styles.search}>
                    <SearchIcon />
                </button>
            </form>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
    )
}

