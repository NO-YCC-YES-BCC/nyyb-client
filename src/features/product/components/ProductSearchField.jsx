import styles from "../styles/ProductSearchField.module.css";
import SearchIcon from "../../../assets/icons/product/search.png";
import CancelIcon from "../../../assets/icons/product/cancel.png";

export default function ProductSearchField({ value, onChange, onClear, onSubmit }) {
  // 키보드의 엔터/검색 키로도 입력한 검색어 그대로 검색되게 한다.
  const submitKeyword = (input) => {
    const keyword = value.trim();
    if (!keyword || !onSubmit) return;

    // 모바일에서 키보드를 내려 검색 결과가 바로 보이게 한다.
    input?.blur();
    onSubmit(keyword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitKeyword(event.currentTarget.querySelector("input"));
  };

  // 폼 제출(implicit submission)이 일어나지 않는 환경도 있어 엔터를 직접 받는다.
  // 한글 조합 중 엔터는 글자 확정용이라 검색하지 않는다.
  const handleKeyDown = (event) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

    event.preventDefault();
    submitKeyword(event.currentTarget);
  };

  return (
    <form role="search" className={styles.inputField} onSubmit={handleSubmit}>
      <img src={SearchIcon} className={styles.searchIcon} alt="search" />
      <input
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        type="text"
        enterKeyHint="search"
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
    </form>
  );
}
