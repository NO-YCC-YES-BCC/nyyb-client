import styles from "../styles/SearchItem.module.css";
import SearchIcon from "../../../assets/icons/product/search.png";

export default function SearchItem({ item, onSearch }) {
  return (
    <div className={styles.item} onClick={() => onSearch(item.name)}>
      <img src={SearchIcon} className={styles.listIcon} />
      <p className={styles.text}>{item.name}</p>
    </div>
  );
}
