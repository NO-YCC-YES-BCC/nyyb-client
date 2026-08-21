import { useState } from 'react';

/**
 * "제품명 + N개 성분 중복" 한 줄 표시.
 * 이름이 길어 말줄임된 경우 탭하면 전체 이름이 펼쳐지고, 다시 탭하면 접힌다.
 * 사용처마다 스타일이 달라 클래스명을 props 로 받는다.
 */
export default function OverlapToggleRow({ overlap, classNames }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      type="button"
      className={`${classNames.row} ${isExpanded ? classNames.rowExpanded : ''}`}
      onClick={() => setIsExpanded((value) => !value)}
      aria-expanded={isExpanded}
    >
      <span className={classNames.name}>{overlap.name}</span>
      <strong className={classNames.count}>{overlap.count}개 성분 중복</strong>
    </button>
  );
}
