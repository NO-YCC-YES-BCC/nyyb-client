/*
  shared/components/Card.jsx
  담당: 천솔
  작업현황판 task: "공통 카드 구현" 
  comment: "리포트/루틴/마이페이지 카드 UI 기반"

  리포트(RemoveProductCard/KeepProductCard), 루틴(RoutineProductCard),
  마이페이지, 히스토리 등 여러 화면에서 공통으로 쓰는 카드 컨테이너.
  tone에 따라 배경색만 달라지고, 나머지 레이아웃/내용은 children으로 자유롭게 구성.
*/
import styles from './Card.module.css';

const TONE_CLASS = {
  default: '',
  keep: styles.toneKeep,
  remove: styles.toneRemove,
  caution: styles.toneCaution,
};

export default function Card({ tone = 'default', className = '', children, ...rest }) {
  const toneClass = TONE_CLASS[tone] || '';

  return (
    <div className={`${styles.card} ${toneClass} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}