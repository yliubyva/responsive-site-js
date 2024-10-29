import { useEffect, useState } from "react";
import styles from "./CurrentDateTime.module.css";
import ClockIcon from "../../assets/Clock.svg?react";
import CalendarIcon from "../../assets/Calendar.svg?react";

export const CurrentDateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());
    const [showColon, setShowColon] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
            setShowColon(prevShowColon => !prevShowColon)
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedDate = dateTime.toLocaleDateString();
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <CalendarIcon className="icon" />
                <p className={styles.date}>{formattedDate}</p>
            </div>
            <div className={styles.group}>
                <ClockIcon className="icon" />
                <p>
                    {hours}
                    <span className={showColon ? styles.colon : styles.hiddenColon}> : </span>
                    {minutes}
                </p>
            </div>
        </div>
    )
}