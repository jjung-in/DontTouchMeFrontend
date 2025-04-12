import { useEffect, useRef, useState } from 'react';

/**
 * 특정 요소가 화면에 들어왔는지 감지하는 Hook
 * @param threshold - 교차 비율 임계값 (기본값 0.1)
 * @param once - 한 번만 감지할지 여부 (기본값 false)
 * @returns observerRef , visible
 */
export const useIntersectionObserver = (threshold = 0.1, once = false) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      if (once) observer.disconnect();
    };
  }, [threshold, once]);

  return { observerRef, visible };
};
