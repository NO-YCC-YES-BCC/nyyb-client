/*
  shared/components/Thumb.jsx
  담당: 천솔

  제품 목록 화면(분석 리포트 등)에서 쓰는 정사각형 썸네일.
  실제 제품 이미지 API가 아직 없어서, 톤 색상 + 브랜드 첫 글자로 된
  placeholder를 공용으로 둔다. 나중에 이미지 URL이 생기면 내부만 <img>로 교체.
*/

import styles from './Thumb.module.css';

export default function Thumb({ tone = 'default', label = '' }) {
  const initial = typeof label === 'string' ? label.trim().slice(0, 1) : '';

  return (
    <div className={`${styles.thumb} ${styles[`tone-${tone}`] || ''}`}>
      {initial}
    </div>
  );
}