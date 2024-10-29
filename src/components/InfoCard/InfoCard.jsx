import PropTypes from "prop-types";
import { BackgroundContainer } from "../BackgroundContainer/BackgroundContainer";
import styles from "./InfoCard.module.css";

export const InfoCard = ({ children }) => {
    return (
        <BackgroundContainer>
            <div className={styles.info}>
                {children}
            </div>
        </BackgroundContainer>
    )
}

InfoCard.propTypes = {
    children: PropTypes.node,
}
