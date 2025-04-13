import { TCreateEventRequest, TFormErrors, TUpdateEventRequest } from '@_types/events.type';

export const getEventStatus = (eventDate: string): '예정' | '진행중' | '완료' => {
  const today = new Date();
  const event = new Date(eventDate);

  const isSameDay =
    today.getFullYear() === event.getFullYear() &&
    today.getMonth() === event.getMonth() &&
    today.getDate() === event.getDate();

  if (event < today && !isSameDay) return '완료';
  if (isSameDay) return '진행중';
  return '예정';
};

/**
 * 이벤트 생성/수정 폼 입력값 중 유효하지 않은 항목에 대한 에러 메시지를 반환
 * @param formValues - 사용자 입력값을 담은 폼 객체
 * @param otherEventType - 이벤트 유형이 '기타'일 경우 사용자가 입력한 값
 * @param isTag - 태그 항목이 활성화되어 있는지 여부
 * @param isTarget - 입금 대상 항목이 활성화되어 있는지 여부
 * @returns
 *  - errors: 입력값이 유효하지 않은 경우 해당 필드명에 에러 메시지를 포함한 객체
 */

export const validateEventForm = (
  formValues: TCreateEventRequest | TUpdateEventRequest,
  otherEventType: string,
  isTag: boolean,
  isTarget: boolean,
): TFormErrors => {
  const errors: TFormErrors = {};

  if (!formValues.eventName.trim()) errors.eventName = '이벤트명을 입력해주세요.';
  if (!formValues.eventDate.trim()) errors.eventDate = '일정을 선택해주세요.';
  if (!formValues.address.trim()) errors.address = '장소를 입력해주세요.';
  if (formValues.eventType === '기타' && !otherEventType.trim()) errors.eventType = '유형을 입력해주세요.';
  if (isTag && (!formValues.tags || formValues.tags.length === 0)) errors.tags = '태그를 하나 이상 입력해주세요.';
  if (isTarget && (!formValues.targets || formValues.targets.length === 0))
    errors.targets = '입금 대상을 하나 이상 입력해주세요.';

  return errors;
};
