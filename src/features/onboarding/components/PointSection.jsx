import { useInView } from "../../../shared/hooks/useInView";
import styles from "../pages/OnboardingPage.module.css";

export default function PointSection({
  point,
  title,
  description,
  className = "",
  children,
}) {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      className={[
        styles.section,
        className,
        isInView ? styles.inView : "",
      ].join(" ")}
    >
      <span className={styles.pointBadge}>{point}</span>

      <h1 className={styles.title}>
        {title.split("\n").map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </h1>

      <p className={styles.description}>
        {description.split("\n").map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <div className={styles.pointContent}>{children}</div>
    </section>
  );
}