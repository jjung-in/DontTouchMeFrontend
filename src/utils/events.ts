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
