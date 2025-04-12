import { useEffect, useRef, useState } from 'react';

/**
 * 특정 요소가 화면에 들어왔는지 감지하는 Hook
 * @param onIntersect - 요소가 화면에 들어왔을 때 실행할 콜백 함수
 * @param threshold - 교차 비율 임계값 (기본값 0.1)
 * @param once - 한 번만 감지할지 여부 (기본값 false)
 * @returns
 *  - observerRef: 감지할 대상 요소에 연결하는 ref
 *  - visible: 요소가 현재 화면에 보이면 true
 */

interface UseIntersectionObserverProps {
  onIntersect?: () => void;
  threshold?: number;
  once?: boolean;
}

export const useIntersectionObserver = ({
  onIntersect,
  threshold = 0.1,
  once = false,
}: UseIntersectionObserverProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          if (onIntersect) onIntersect();
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, threshold, once]);

  return { observerRef, visible };
};
