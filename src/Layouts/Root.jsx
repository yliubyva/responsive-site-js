import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import styles from "./Root.module.css";
import { Search } from "../components/Search";
import { Navigation } from "../components/Navigation";
import { useMemo } from "react";
import { useWeather } from "../context/WeatherContext";
import { BackgroundContainer } from "../components/BackgroundContainer/BackgroundContainer";

export const Root = () => {
    const { currentWeather } = useWeather();

    const backgroundClass = useMemo(() => {
        if (currentWeather && currentWeather.weather && currentWeather.weather[0]) {
            switch (currentWeather.weather[0].main) {
                case 'Rain':
                    return 'rainy';
                case 'Clear':
                    return 'sunny';
                case 'Clouds':
                    return 'cloudy';
                case 'Snow':
                    return 'snowy';
                default:
                    return 'default';
            }
        }
        return 'default';
    }, [currentWeather]);

    return (
        <div>
            <div className={`background ${backgroundClass}`}></div>
            <Header />
            <main>
                <div className={styles.container}>
                    <Search />
                    <Navigation />
                </div>
                <div className={styles.box}>
                    <BackgroundContainer width="700">
                        <Outlet />
                    </BackgroundContainer>
                </div>

            </main>
        </div>
    )
}