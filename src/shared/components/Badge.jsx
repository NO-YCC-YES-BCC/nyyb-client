/*
  shared/components/Badge.jsx
  담당: 천솔
  작업현황판 task: "공통 배지 구현" (page/component: Badge.jsx, P0, 마감 8/12)
  comment: "유지, 제외, 주의, 히스토리 상태 표시"
*/

import { BADGE_TYPE, BADGE_LABEL } from '../constants/badge';
import styles from './Badge.module.css';

export default function Badge({ type = BADGE_TYPE.HISTORY, label, className = '' }) {
  const text = label ?? BADGE_LABEL[type] ?? '';

  return (
    <span className={[styles.badge, styles[type], className].filter(Boolean).join(' ')}>
      {text}
    </span>
  );
}
