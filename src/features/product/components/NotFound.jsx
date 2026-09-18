import Button from "../../../shared/components/Button";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <h2 className={styles.title}>검색 결과가 없어요.</h2>
        <p className={styles.subTitle}>조금 더 단순한 이름으로 검색해보세요</p>
      </div>
      <Button>제품 추가 등록 요청하기</Button>
    </section>
  );
}
