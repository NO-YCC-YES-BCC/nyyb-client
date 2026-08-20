import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/components/Modal";
import { ROUTES } from "../../../shared/constants/routes";
import myProductsImage from "../../../assets/images/modal/my-products.png";
import newPurchaseImage from "../../../assets/images/modal/new-purchase.png";
import styles from "./AnalysisStartModal.module.css";
import qmarkImage from "../../../assets/images/modal/qmark.svg";


const OPTIONS = [
    {
        mode: "my-products",
        eyebrow: "MY PRODUCTS",
        title: "전체 화장품 분석",
        description: "지금 가지고 있는\n제품을 분석해요",
        image: myProductsImage,
        themeClass: "cardGreen",
    },
    {
        mode: "new-purchase",
        eyebrow: "NEW PURCHASE",
        title: "구매 예정 제품 분석",
        description: "구매 전 한 번 더\n확인해요",
        image: newPurchaseImage,
        themeClass: "cardPink",
    },
    ];

    export default function AnalysisStartModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    // 촬영 화면은 하나를 공용으로 쓰고, 어떤 경로로 들어왔는지만 state 로 넘긴다.
    function handleSelect(mode) {
        onClose();
        navigate(ROUTES.CAPTURE, { state: { mode } });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} labelledBy="analysis-start-title">
        <img className={styles.mark} src={qmarkImage} alt="" />


        <h2 id="analysis-start-title" className={styles.title}>
            무엇을 덜어낼까요?
        </h2>

        <p className={styles.subtitle}>
            가지고 있는 제품을 한 번에 분석하거나
            <br />
            구매 예정인 제품만 먼저 확인해보세요.
        </p>

        <div className={styles.optionList}>
            {OPTIONS.map((option) => (
            <button
                key={option.mode}
                type="button"
                className={`${styles.card} ${styles[option.themeClass]}`}
                onClick={() => handleSelect(option.mode)}
            >
                <img className={styles.cardImage} src={option.image} alt="" />

                <span className={styles.cardText}>
                <span className={styles.cardEyebrow}>{option.eyebrow}</span>
                <span className={styles.cardTitle}>{option.title}</span>
                <span className={styles.cardDescription}>{option.description}</span>
                </span>
            </button>
            ))}
        </div>
        </Modal>
    );
}
