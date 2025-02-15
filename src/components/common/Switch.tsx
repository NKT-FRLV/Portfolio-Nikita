import { motion  } from "framer-motion"
import styles from "./switch.module.css"
type SwitchProps = {
    value: boolean;
    onClick: () => void;
}

const Switch = ({value: isOn, onClick}: SwitchProps) => {


    return (
        <div
            className={`${styles.container} ${isOn ? styles.active : ""}`}
            style={{ justifyContent: "flex-" + (isOn ? "start" : "end") }}
            onClick={onClick}
        >
            <motion.div
                className={styles.handle}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.4,
                }}
            />
        </div>
    )
}

export default Switch;
