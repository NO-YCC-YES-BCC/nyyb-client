import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import dropperIcon from "../../../assets/icons/entry/dropper.svg";
import jarIcon from "../../../assets/icons/entry/jar.svg";
import sprayIcon from "../../../assets/icons/entry/spray.svg";
import pumpIcon from "../../../assets/icons/entry/pump.svg";
import styles from "./CyclingIcon.module.css";

const ICONS = [
    { src: dropperIcon, bg: "#efebfb" },
    { src: jarIcon, bg: "#fbf3e1" },
    { src: sprayIcon, bg: "#fbeee8" },
    { src: pumpIcon, bg: "#edf5ed" },
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