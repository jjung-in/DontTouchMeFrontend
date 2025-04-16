import { TCreateRecordRequest, TUpdateRecordRequest } from '@_types/records.type';

interface TRecordConfig {
  label: string;
  element: string;
  width: string;
  required?: boolean;
  options?: string[];
}

interface TRecordReadConfig extends TRecordConfig {
  type: keyof TUpdateRecordRequest;
}

interface TRecordFieldConfig extends TRecordConfig {
  type: keyof TCreateRecordRequest;
}

export const recordReadConfig: Record<string, TRecordReadConfig> = {
  '입출금 분류': {
    type: 'type',
    label: '입출금 분류',
    element: 'select',
    width: '120px',
    required: true,
    options: ['입금', '출금'],
  },
  '입출금 내역명': {
    type: 'history',
    label: '입출금 내역명',
    element: 'text',
    width: '180px',
    required: true,
  },
  금액: {
    type: 'price',
    label: '금액',
    element: 'select',
    width: '120px',
    required: true,
    options: ['50000', '100000', '150000'],
  },
  이름: {
    type: 'name',
    label: '이름',
    element: 'text',
    width: '120px',
  },
  태그: {
    type: 'tags',
    label: '태그',
    element: 'tagSelect',
    width: '250px',
  },
  '사진 첨부': {
    type: 'imageUrl',
    label: '사진 첨부',
    element: 'file',
    width: '120px',
  },
  입금대상: {
    type: 'target',
    label: '입금 대상',
    element: 'select',
    width: '120px',
  },
  감사장: {
    type: 'contact',
    label: '연락처',
    element: 'text',
    width: '230px',
  },
};

export const recordFieldConfig: Record<string, TRecordFieldConfig> = {
  '입출금 분류': {
    type: 'type',
    label: '입출금 분류',
    element: 'select',
    width: '120px',
    required: true,
    options: ['입금', '출금'],
  },
  '입출금 내역명': {
    type: 'history',
    label: '입출금 내역명',
    element: 'text',
    width: '180px',
    required: true,
  },
  금액: {
    type: 'price',
    label: '금액',
    element: 'select',
    width: '120px',
    required: true,
    options: ['50000', '100000', '150000'],
  },
  이름: {
    type: 'name',
    label: '이름',
    element: 'text',
    width: '120px',
  },
  태그: {
    type: 'tags',
    label: '태그',
    element: 'tagSelect',
    width: '250px',
  },
  '사진 첨부': {
    type: 'imageUrl',
    label: '사진 첨부',
    element: 'file',
    width: '120px',
  },
  입금대상: {
    type: 'target',
    label: '입금 대상',
    element: 'select',
    width: '120px',
  },
  감사장: {
    type: 'contact',
    label: '연락처',
    element: 'text',
    width: '230px',
  },
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

/**
 * 단일 입출금 입력값을 검사하여 유효하지 않은 필드명을 배열로 반환
 * @param record - 단일 입출금 입력값 객체
 * @returns
 *  - invalidFields: 유효하지 않은 필드명을 담은 배열
 */

export const validateSingleRecord = <T extends TCreateRecordRequest | TUpdateRecordRequest>(record: T): (keyof T)[] => {
  const invalidFields: (keyof T)[] = [];

  if (!record.type) invalidFields.push('type');
  if (!record.history?.trim()) invalidFields.push('history');
  if (!record.price) invalidFields.push('price');

  return invalidFields;
};

/**
 * 입출금 입력 행들을 검사하여 유효하지 필드를 가진 행만 추려낸 객체를 반환
 * @param rows - 각 행의 id와 입력값을 담은 배열
 * @returns
 *  - result: 유효하지 않은 필드를 가진 행만 추려낸 객체
 *            key(행의 id), value(유효하지 않은 필드명을 담은 배열)
 */

export const validateRecordForm = (
  rows: { id: number; values: TCreateRecordRequest }[],
): Record<number, (keyof TCreateRecordRequest)[]> => {
  const result: Record<number, (keyof TCreateRecordRequest)[]> = {};

  for (const row of rows) {
    const invalidFields = validateSingleRecord(row.values);
    if (invalidFields.length) {
      result[row.id] = invalidFields;
    }
  }

  return result;
};
