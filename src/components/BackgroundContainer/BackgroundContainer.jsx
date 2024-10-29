import PropTypes from "prop-types";
import styles from "./BackgroundContainer.module.css";

export const BackgroundContainer = ({ width, children }) => {
    return (
        <div className={styles.container}
            style={width && {maxWidth: `${width}px`, width: "100%"}}
        >
            {children}
        </div>
    )
}

BackgroundContainer.propTypes = {
    width: PropTypes.string,
    children: PropTypes.node,
}