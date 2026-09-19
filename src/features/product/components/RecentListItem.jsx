import styles from "../styles/RecentListItem.module.css";

export default function RecentListItem({ children, onClick }) {
  return (
    <button type="button" className={styles.item} onClick={onClick}>
      {children}
    </button>
  );
}
