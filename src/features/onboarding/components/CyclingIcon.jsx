import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import cosmeticsIcon from "../../../assets/icons/entry/cosmetics.svg";
import lotionIcon from "../../../assets/icons/entry/lotion.svg";
import personalIcon from "../../../assets/icons/entry/personal.svg";
import serumIcon from "../../../assets/icons/entry/serum.svg";
import styles from "./CyclingIcon.module.css";

const ICONS = [
    { src: cosmeticsIcon, bg: "#efebfb" },
    { src: lotionIcon, bg: "#fbf3e1" },
    { src: personalIcon, bg: "#fbeee8" },
    { src: serumIcon, bg: "#edf5ed" },
];

export default function CyclingIcon() {
    const [index, setIndex] = useState(0);
    const currentIcon = ICONS[index];

    useEffect(() => {
    const timerId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % ICONS.length);
    }, 2000);

    return () => clearInterval(timerId);
    }, []);

    return (
    <motion.div
        className={styles.wrapper}
        animate={{ backgroundColor: currentIcon.bg }}
        transition={{ duration: 0.4, ease: "easeOut" }}
    >
        <AnimatePresence mode="wait">
        <motion.img
            key={currentIcon.src}
            src={currentIcon.src}
            alt=""
            className={styles.icon}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        />
        </AnimatePresence>
    </motion.div>
    );
}