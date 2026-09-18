import styles from "../styles/RecentListItem.module.css";

export default function RecentListItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}
