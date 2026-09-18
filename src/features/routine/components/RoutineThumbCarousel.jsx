import { useEffect, useRef, useState } from 'react';
import { getCategoryIcon } from '../../../shared/constants/productCategory';
import styles from './RoutineThumbCarousel.module.css';

const ITEMS_PER_PAGE = 4;

export default function RoutineThumbCarousel({ items }) {
  const rowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  useEffect(() => {
    const row = rowRef.current;
    if (!row || pageCount <= 1) return;

    const handleScroll = () => {
      const maxScroll = row.scrollWidth - row.clientWidth;
      if (maxScroll <= 0) return;
      const progress = row.scrollLeft / maxScroll;
      setActiveIndex(Math.round(progress * (pageCount - 1)));
    };

    row.addEventListener('scroll', handleScroll, { passive: true });
    return () => row.removeEventListener('scroll', handleScroll);
  }, [pageCount]);

  const goToPage = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    const row = rowRef.current;
    if (!row) return;
    const maxScroll = row.scrollWidth - row.clientWidth;
    row.scrollTo({
      left: (index / (pageCount - 1)) * maxScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.thumbRow} ref={rowRef}>
        {items.map((item) => (
          <img
            key={item.id}
            src={getCategoryIcon(item.categorySub)}
            alt={item.productName}
            className={styles.thumb}
          />
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