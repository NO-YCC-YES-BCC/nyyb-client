import styles from "../styles/RecentListSection.module.css";
import RecentListItem from "./RecentListItem";

export default function RecentListSection({ items, onSearch }) {
  return (
    <section className={styles.recentSection}>
      <h3 className={styles.recentTitle}>최근 검색</h3>
      <div className={styles.listSection}>
        {items.map((item) => (
          <RecentListItem key={item} onClick={() => onSearch(item)}>
            {item}
          </RecentListItem>
        ))}
      </div>
    </section>
  );
}
