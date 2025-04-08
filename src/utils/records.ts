import { TCreateRecordRequest, TRecordItem } from '@_types/records.type';

interface TRecordConfig {
  label: string;
  width: string;
  required?: boolean;
}

interface TRecordReadConfig extends TRecordConfig {
  type: keyof TRecordItem;
}

interface TRecordFieldConfig extends TRecordConfig {
  type: keyof TCreateRecordRequest;
}

export const recordReadConfig: Record<string, TRecordReadConfig> = {
  '입출금 분류': { type: 'type', label: '입출금 분류', width: '120px', required: true },
  '입출금 내역명': { type: 'history', label: '입출금 내역명', width: '180px', required: true },
  금액: { type: 'price', label: '금액', width: '120px', required: true },
  이름: { type: 'name', label: '이름', width: '180px' },
  '사진 첨부': { type: 'image', label: '사진 첨부', width: '120px' },
  감사장: { type: 'contact', label: '연락처', width: '220px' },
};

export const recordFieldConfig: Record<string, TRecordFieldConfig> = {
  '입출금 분류': { type: 'type', label: '입출금 분류', width: '120px', required: true },
  '입출금 내역명': { type: 'history', label: '입출금 내역명', width: '180px', required: true },
  금액: { type: 'price', label: '금액', width: '120px', required: true },
  이름: { type: 'name', label: '이름', width: '180px' },
  태그: { type: 'tags', label: '태그', width: '200px' },
  '사진 첨부': { type: 'imageUrl', label: '사진 첨부', width: '120px' },
  입금대상: { type: 'target', label: '입금 대상', width: '100px' },
  감사장: { type: 'contact', label: '연락처', width: '220px' },
};

export const getRecordGridTemplate = (mode: string, items: string[]) => {
  const widths =
    mode === 'read'
      ? items.map((item) => recordReadConfig[item]?.width || '120px')
      : items.map((item) => recordFieldConfig[item]?.width || '120px');

  if (mode === 'create') return [...widths, '104px'].join(' ');
  if (mode === 'update') return [...widths, '104px', '104px'].join(' ');
  return widths.join(' ');
};

export const formatNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return new Intl.NumberFormat('ko-KR').format(num);
};
