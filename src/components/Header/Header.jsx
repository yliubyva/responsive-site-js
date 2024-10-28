import { BackgroundContainer } from "../BackgroundContainer/BackgroundContainer";
import { CurrentDateTime } from "../CurrentDateTime/CurrentDateTime";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <BackgroundContainer>
                <div className={styles.container}>
                    <span>Weather Forecast</span>

                    <div className={styles.group}>
                        <CurrentDateTime />
                    </div>
                </div>
            </BackgroundContainer>
        </header>
    )
}