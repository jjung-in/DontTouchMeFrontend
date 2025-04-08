export const formatNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return new Intl.NumberFormat('ko-KR').format(num);
};
