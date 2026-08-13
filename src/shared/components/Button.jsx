import styles from "./Button.module.css";

export default function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    onClick,
    leftIcon,
}) {
    return(
        <button
        type={type}
        className={[styles.button, styles[variant]].join(" ")}
        disabled={disabled}
        onClick={onClick}
        >
            {leftIcon && (
                <img className={styles.leftIcon} src={leftIcon} alt="" />    
            )}
            <span>{children}</span>
        </button>
    );
}