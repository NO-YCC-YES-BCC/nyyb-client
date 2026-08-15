/*
  shared/components/Badge.jsx
  담당: 천솔
  작업현황판 task: "공통 배지 구현" 
  comment: "유지, 제외, 주의, 히스토리 상태 표시"

  4가지 상태(keep/remove/caution/history)를 표시하는 공통 pill 배지.
  Card 안에 얹어서 "유지/제외/주의" 등 상태를 표시할 때 사용.
*/
import styles from './Badge.module.css';

const TONE_CLASS = {
  keep: styles.keep,
  remove: styles.remove,
  caution: styles.caution,
  history: styles.history,
};

export default function Badge({ tone = 'keep', children }) {
  return <span className={`${styles.badge} ${TONE_CLASS[tone] || ''}`}>{children}</span>;
}