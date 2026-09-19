import { useEffect, useRef } from "react";
import styles from "../styles/LoadMoreTrigger.module.css";

/**
 * 목록 끝에 두면, 화면에 가까워질 때 onLoadMore 를 불러 다음 페이지를 이어 받는다 (무한 스크롤).
 */
export default function LoadMoreTrigger({ hasMore, isLoading, onLoadMore }) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !hasMore) return;

    // 끝에 닿기 조금 전부터 미리 불러와 스크롤이 끊기지 않게 한다.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={triggerRef} className={styles.trigger} aria-live="polite">
      {isLoading && <span className={styles.spinner} aria-label="더 불러오는 중" />}
    </div>
  );
}
