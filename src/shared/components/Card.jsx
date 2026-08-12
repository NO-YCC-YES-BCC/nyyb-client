/*
  shared/components/Card.jsx
  담당: 천솔
  작업현황판 task: "공통 카드 구현" (page/component: Card.jsx, P0, 마감 8/12)
  comment: "리포트/루틴/마이페이지 카드 UI 기반"

  분석 리포트(RemoveProductCard/KeepProductCard/IngredientWarningCard),
  루틴(RoutineProductCard) 등 천솔 담당 카드형 UI가 공통으로 감싸 쓰는 뼈대 컴포넌트.
*/

import styles from './Card.module.css';

export default function Card({
  as: Tag = 'div',
  tone = 'default', // 'default' | 'remove' | 'keep' | 'caution'
  padding = 'md', // 'sm' | 'md' | 'lg'
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const classNames = [
    styles.card,
    styles[`tone-${tone}`],
    styles[`padding-${padding}`],
    interactive ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classNames} {...rest}>
      {children}
    </Tag>
  );
}
