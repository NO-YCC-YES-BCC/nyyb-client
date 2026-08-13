/*
  features/mypage/components/SettingItem.jsx
  담당: 천솔
  작업현황판 task: "마이페이지 프로필 UI 구현"에서 사용하는 공통 설정 행 컴포넌트 (P1, 마감 8/15)

  마이페이지의 설정 리스트(가입 정보, 카카오톡 수신 여부 등)에서 재사용하는
  한 줄짜리 행 컴포넌트. 값만 보여줄 수도 있고(value), 토글로 켜고 끌 수도 있다(toggle).

  참고: "카카오톡 수신 토글 구현"(실제 on/off 연동)은 우선순위 P2라 오늘 범위 밖이다.
  이 화면에서는 토글 UI만 배치하고 disabled + "준비중" 힌트로 표시해둔다.
*/

import styles from './SettingItem.module.css';

export default function SettingItem({ label, description, value, toggle, hint }) {
  return (
    <div className={styles.item}>
      <div className={styles.textGroup}>
        <p className={styles.label}>{label}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <div className={styles.control}>
        {toggle ? (
          <button
            type="button"
            className={[styles.toggle, toggle.checked ? styles.toggleOn : ''].filter(Boolean).join(' ')}
            onClick={toggle.onChange}
            disabled={toggle.disabled}
            aria-pressed={toggle.checked}
          >
            <span className={styles.toggleKnob} />
          </button>
        ) : (
          value != null && <span className={styles.value}>{value}</span>
        )}
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    </div>
  );
}
