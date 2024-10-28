import { NavLink } from "react-router-dom";
import { Routes } from "../../constants";
import styles from "./Navigation.module.css";

export const Navigation = () => {

    return (

        <nav className={styles.container}>
            <ul className={styles.group}>
                <li className={styles.item}>
                    <NavLink to={Routes.HOME} className={({ isActive }) =>
                        isActive ? `${styles.active}` : styles.link
                    }
                    >
                        Today
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to={Routes.FORECAST_5_DAY} className={({ isActive }) =>
                        isActive ? `${styles.active}` : styles.link
                    }
                    >
                        5-Day Forecast
                    </NavLink>
                </li>
            </ul>
        </nav>

    )
}