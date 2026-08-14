import { useEffect, useRef, useState } from "react";

export function useInView() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
        setIsInView(entry.isIntersecting);
    },
    { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
   }, []);

  return [ref, isInView];
}