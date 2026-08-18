import ImagePicker from "../components/ImagePicker";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/constants/routes";
import styles from "./CaptureGuidePage.module.css";
import { addProductImage } from "../api/captureApi";

export default function CaptureGuidePage() {
    const navigate = useNavigate();


    async function handleImageChange(file) {
        if (!file) return;

        await addProductImage(file);
        navigate(ROUTES.CAPTURE_PRODUCTS);
    }

    function goBack() {
        navigate(-1);
    }

    return (
        <main className={styles.page}>
            <button type="button" className={styles.backButton} onClick={goBack}>
                ← 이전
            </button>

            <h1 className={styles.title}>
                가이드라인에 맞춰
                <br />
                제품 사진을 촬영해주세요!
            </h1>

            <section className={styles.cameraGuide} aria-label="촬영 가이드 예시">
                <div className={styles.guideFrame}>
                    <div className={styles.detectBadge}>
                        <span className={styles.statusDot} />
                        전성분 라벨 감지 중
                    </div>

                    <div className={styles.cornerTopLeft} />
                    <div className={styles.cornerTopRight} />
                    <div className={styles.cornerBottomLeft} />
                    <div className={styles.cornerBottomRight} />

                    <div className={styles.bottleShape}>
                        <svg
                            className={styles.bottleSvg}
                            xmlns="http://www.w3.org/2000/svg"
                            width="240"
                            height="311"
                            viewBox="0 0 240 311"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M190.593 0C194.925 6.57504e-08 199.081 1.75298 202.145 4.87305C205.208 7.9932 206.93 12.2251 206.93 16.6377C206.93 21.0502 205.208 25.2822 202.145 28.4023C199.081 31.5224 194.925 33.2754 190.593 33.2754H185.147V44.3672L183.327 44.7979H208.073C225.488 44.7979 239.602 58.3964 239.603 75.167V280.631C239.602 297.402 225.488 311 208.073 311H31.5293C14.1146 311 5.29924e-05 297.402 0 280.631V75.167C0.000186214 58.3964 14.1146 44.7979 31.5293 44.7979H56.2754L54.4551 44.3672V33.2754H49.0098C44.6771 33.2754 40.5217 31.5224 37.458 28.4023C34.3943 25.2822 32.6729 21.0502 32.6729 16.6377C32.6729 12.2251 34.3943 7.9932 37.458 4.87305C40.5217 1.75297 44.6771 0 49.0098 0H190.593Z"
                                fill="#E4F5F5"
                                fillOpacity="0.42"
                            />
                        </svg>

                        <div className={styles.bottleHighlight} />
                        <div className={styles.labelGlow} />

                        <div className={styles.labelCard}>
                            <div className={styles.labelRow}>
                                <strong>제품명</strong>
                                <span>SOTT 아쿠아 수분 젤 크림</span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>용량</strong>
                                <span>100ml</span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>판매원</strong>
                                <span>(주)SOTT화장품</span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>제조국</strong>
                                <span>대한민국</span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>사용기한</strong>
                                <span>개봉 전 36개월/개봉 후 12개월</span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>전성분</strong>
                                <span>
                                    정제수, 글리세린,
                                    <br />
                                    나이아신아마이드, 병풀추출물 외
                                </span>
                            </div>

                            <div className={styles.labelRow}>
                                <strong>주의사항</strong>
                                <span>이상 증상 발생시 전문의와 상담할 것</span>
                            </div>
                        </div>
                    </div>

                    <p className={styles.frameHint}>
                        글자가 잘 보이도록 빛 반사를 피해주세요
                    </p>
                </div>
            </section>

            <p className={styles.tip}>
                <span className={styles.tipIcon}>💡</span>
                <span>전성분표면 전체가 가이드 틀 안에 들어오게 해주세요</span>
            </p>

            <div className={styles.buttonRow}>
                <ImagePicker
                    buttonText="카메라 열기"
                    buttonVariant="primary"
                    capture="environment"
                    className={styles.guideButton}
                    onSelect={handleImageChange}
                />

                <ImagePicker 
                    buttonText="사진첩 열기"
                    buttonVariant="primary"
                    className={styles.guideButton}
                    onSelect={handleImageChange}
                />
            </div>
        </main>
    );
}