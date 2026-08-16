/*
  features/routine/pages/RoutineEditPage.jsx
  라우트: /routine/edit
  담당: 천솔
  작업현황판 task: "루틴 수정 제안 UI 구현" (P0, API: /report/{jobId})
  comment: "사용자가 유지할 제품과 시간대를 고르는 화면"
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { mockRoutineDetail } from '../../../mocks/mockData';
import RoutineProductCard from '../components/RoutineProductCard';
import styles from './RoutineEditPage.module.css';

function getInitialProducts() {
  const morningKeep = mockRoutineDetail.morning
    .filter((item) => item.status === 'keep')
    .map((item) => ({ ...item, morning: true, evening: false }));
  const eveningKeep = mockRoutineDetail.evening
    .filter((item) => item.status === 'keep')
    .map((item) => ({ ...item, morning: false, evening: true }));
  return [...morningKeep, ...eveningKeep];
}

export default function RoutineEditPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(getInitialProducts);

  const toggleSlot = (id, slot) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [slot]: !item[slot] } : item))
    );
  };

  const handlePreview = () => {
    navigate(ROUTES.ROUTINE_PREVIEW, { state: { selection: products } });
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerPill}>
        <span className={styles.headerLabel}>루틴 수정 제안</span>
      </div>
      <p className={styles.subtitle}>유지할 제품마다 사용할 시간대를 선택해주세요.</p>

      <div className={styles.list}>
        {products.map((product) => (
          <div key={product.id} className={styles.row}>
            <RoutineProductCard product={product} />
            <div className={styles.slotToggle}>
              <button
                type="button"
                className={`${styles.slotButton} ${product.morning ? styles.slotButtonActive : ''}`}
                onClick={() => toggleSlot(product.id, 'morning')}
              >
                오전
              </button>
              <button
                type="button"
                className={`${styles.slotButton} ${product.evening ? styles.slotButtonActive : ''}`}
                onClick={() => toggleSlot(product.id, 'evening')}
              >
                오후
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <button type="button" className={styles.ctaButton} onClick={handlePreview}>
          변화 미리보기
        </button>
      </div>
    </div>
  );
}