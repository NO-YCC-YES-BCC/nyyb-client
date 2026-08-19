import { getCategoryIcon } from '../constants/categoryIcons';
import { useRef, useState, useEffect } from 'react';
import styles from './RoutineThumbCarousel.module.css';

const ITEMS_PER_VIEW = 4;
const GAP = 8;

export default function RoutineThumbCarousel({ items }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbSize, setThumbSize] = useState(76);
  const pageCount = Math.max(1, Math.ceil(items.length / ITEMS_PER_VIEW));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateSize = () => {
      const rowWidth = el.clientWidth;
      const size = (rowWidth - GAP * (ITEMS_PER_VIEW - 1)) / ITEMS_PER_VIEW;
      setThumbSize(size);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(index);
  };

  const goToPage = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.thumbRow}
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ '--thumb-size': `${thumbSize}px` }}
      >
        {items.map((item) => (
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