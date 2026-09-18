import styles from "../styles/ProductSearchField.module.css";
import SearchIcon from "../../../assets/icons/product/search.png";
import CancelIcon from "../../../assets/icons/product/cancel.png";

export default function ProductSearchField({ value, onChange, onClear }) {
  return (
    <div className={styles.inputField}>
      <img src={SearchIcon} className={styles.searchIcon} alt="search" />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="제품명 또는 브랜드를 검색하세요."
        className={`${styles.searchInput} ${value ? styles.hasValue : ""}`}
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClear}
          aria-label="검색어 지우기"
        >
          <img src={CancelIcon} className={styles.cancelIcon} alt="cancel" />
        </button>
      )}
    </div>
  );
}
