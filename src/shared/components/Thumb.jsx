/*
  shared/components/Thumb.jsx
  담당: 천솔

  와이어프레임의 제품 목록 화면들(분석 리포트, 루틴 상세, 촬영 후 제품 목록 등)은
  전부 "정사각형 썸네일 + 텍스트" 리스트 로우 형태를 쓴다. 실제 제품 사진 API가
  아직 없어서(13번 참고), 색상 톤 + 이니셜 글자로 된 placeholder 썸네일을 공용으로 둔다.
  나중에 실제 이미지 URL이 생기면 이 컴포넌트 내부만 <img>로 교체하면 된다.
*/

import styles from './Thumb.module.css';

export default function Thumb({ tone = 'default', label = '', size = 'md' }) {
  const initial = typeof label === 'string' ? label.trim().slice(0, 1) : '';

  return (
    <div className={[styles.thumb, styles[`tone-${tone}`], styles[`size-${size}`]].filter(Boolean).join(' ')}>
      {initial}
    </div>
  );
}
