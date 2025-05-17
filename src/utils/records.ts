import { TRecordFormErrors, TRecordFormValues } from '@_types/records.type';

interface TRecordConfig {
  type: keyof TRecordFormValues;
  label: string;
  element: string;
  width: string;
  required?: boolean;
  options?: string[];
}

export const recordConfig: Record<string, TRecordConfig> = {
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
    width: '170px',
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

/**
 * 입출금 내역 테이블의 grid-template-columns 값을 반환하는 함수
 * @param mode - 폼 모드 (create | update | read)
 * @param items - 표시할 입출금 항목 이름 배열
 * @returns CSS grid-template-columns 속성에 사용할 문자열
 */
export const getRecordGridTemplate = (mode: string, items: string[]) => {
  const widths = items.map((item) => recordConfig[item]?.width || '120px');
  if (mode === 'create') return [...widths, '104px'].join(' ');
  if (mode === 'update') return [...widths, '104px', '104px'].join(' ');
  return widths.join(' ');
};

/**
 * 숫자 또는 숫자 형태의 문자열을 천 단위 콤마 형식의 문자열로 변환하여 반환
 * @param value - 포맷할 숫자 또는 숫자 문자열
 * @returns 천 단위 콤마가 적용된 문자열
 */
export const formatNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return new Intl.NumberFormat('ko-KR').format(num);
};

/**
 * 단일 입출금 입력값을 검사하여 유효하지 않은 필드 목록을 객체 형태로 반환
 * @param record - 단일 입출금 입력값 객체
 * @returns 유효하지 않은 필드명을 key로 가지는 객체 (각 값은 true)
 */
export const validateSingleRecord = (record: TRecordFormValues, sendType?: string | null): TRecordFormErrors => {
  const errors: TRecordFormErrors = {};

  if (!record.type) errors.type = true;
  if (!record.history?.trim()) errors.history = true;
  if (!record.price) errors.price = true;
  if (sendType === 'EMAIL' && record.contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.contact))
    errors.contact = true;

  return errors;
};

/**
 * 입출금 입력 행들을 검사하여 유효하지 필드가 있는 행만 추려낸 객체를 반환
 * @param rows - 각 행의 id와 입력값을 담은 배열
 * @returns 유효하지 않은 필드를 가진 행만 포함하는 객체
 *  - key : 행의 id
 *  - value : 유효하지 않은 필드명을 key로 갖는 객체 (각 값은 true)
 */
export const validateRecordForm = (
  rows: { id: number; values: TRecordFormValues }[],
  sendType?: string | null,
): Record<number, TRecordFormErrors> => {
  const result: Record<number, TRecordFormErrors> = {};

  for (const row of rows) {
    const errors = validateSingleRecord(row.values, sendType);
    if (Object.keys(errors).length > 0) {
      result[row.id] = errors;
    }
  }

  return result;
};
