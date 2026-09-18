import styles from "../styles/SearchListSection.module.css";
import SearchItem from "./SearchItem";

export default function SearchListSection({ items, onSearch }) {
  return (
    <section className={styles.searchSection}>
      {items.map((item) => (
        <SearchItem item={item} key={item.productId} onSearch={onSearch} />
      ))}
    </section>
  );
}
