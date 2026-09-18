import { useState } from "react";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import { requestProduct } from "../apis/product";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setIsRequestModalOpen(false);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedName = productName.trim();

    if (!normalizedName || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await requestProduct({ keyword: normalizedName });
      setProductName("");
      handleClose();
    } catch {
      setErrorMessage("요청을 보내지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <Modal
        isOpen={isRequestModalOpen}
        onClose={handleClose}
        labelledBy="product-request-title"
        className={styles.requestModal}
      >
        <form className={styles.requestForm} onSubmit={handleSubmit}>
          <h2 id="product-request-title" className={styles.srOnly}>
            제품 등록 요청
          </h2>
          <label htmlFor="product-request-name" className={styles.srOnly}>
            제품명
          </label>
          <textarea
            id="product-request-name"
            className={styles.requestInput}
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            placeholder="제품명을 최대한 상세하게 입력해주세요."
            autoFocus
            required
          />
          {errorMessage && (
            <p className={styles.errorMessage} role="alert">
              {errorMessage}
            </p>
          )}
          <Button
            type="submit"
            className={styles.requestButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "요청하는 중..." : "제품 등록 요청하기"}
          </Button>
        </form>
      </Modal>
      <div className={styles.box}>
        <h2 className={styles.title}>검색 결과가 없어요.</h2>
        <p className={styles.subTitle}>조금 더 단순한 이름으로 검색해보세요</p>
      </div>
      <Button onClick={() => setIsRequestModalOpen(true)}>
        제품 추가 등록 요청하기
      </Button>
    </section>
  );
}
