import { getCategoryIcon } from '../constants/categoryIcons';
import { useRef, useState, useEffect } from 'react';
import styles from './RoutineThumbCarousel.module.css';

const ITEMS_PER_VIEW = 4;
const GAP = 6;

export default function RoutineThumbCarousel({ items }) {
  const rowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbSize, setThumbSize] = useState(76);
  const pageCount = Math.max(1, Math.ceil(items.length / ITEMS_PER_VIEW));

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const updateSize = () => {
      const size = (el.clientWidth - GAP * (ITEMS_PER_VIEW - 1)) / ITEMS_PER_VIEW;
      if (size > 0) setThumbSize(size);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToPage = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveIndex(index);
  };

  // 현재 페이지에 해당하는 4개만 렌더링한다.
  const visibleItems = items.slice(activeIndex * ITEMS_PER_VIEW, (activeIndex + 1) * ITEMS_PER_VIEW);

  return (
    <div className={styles.carousel}>
      <div className={styles.thumbRow} ref={rowRef} style={{ '--thumb-size': `${thumbSize}px` }}>
        {visibleItems.map((item) => (
          <img key={item.id} src={getCategoryIcon(item.category)} alt={item.productName} className={styles.thumb} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className={styles.dots}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
              onClick={(event) => goToPage(event, index)}
              aria-label={`${index + 1}번째 이미지 그룹 보기`}
            />
          ))}
        </div>
      )}
    </div>
  );
}