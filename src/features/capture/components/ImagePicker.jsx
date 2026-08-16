import { useRef } from "react";
import Button from "../../../shared/components/Button";
import styles from "./ImagePicker.module.css";

export default function ImagePicker({
    buttonText = "+ 제품 추가 촬영하기",
    buttonVariant = "secondaryDashed",
    onSelect,
}) {
    const inputRef = useRef(null);

    function openPicker() {
        inputRef.current?.click();
    }

    function handleChange(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        onSelect(file);
        event.target.value = "";
    }

    return (
        <>
            <Button variant={buttonVariant} onClick={openPicker}>
                {buttonText}
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className={styles.fileInput}
                onChange={handleChange}
            />
        </>
    );
}