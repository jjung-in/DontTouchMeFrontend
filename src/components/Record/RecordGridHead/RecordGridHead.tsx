import required from '@_assets/images/required.png';
import { TEventDetailResponse } from '@_types/events.type';
import { recordConfig } from '@_utils/records';
import * as S from './RecordGridHead.styles';

interface Props {
  mode: 'create' | 'update' | 'read';
  event: TEventDetailResponse;
}

const RecordGridHead = ({ mode, event }: Props) => {
  return (
    <>
      {event.eventInfoItems.map((item) => (
        <S.GridCell key={`header-${item}`}>
          {item === '감사장' ? (event.sendType === 'EMAIL' ? '이메일' : '연락처') : recordConfig[item].label || item}
          {recordConfig[item].required && <img src={required} alt="필수 입력" />}
        </S.GridCell>
      ))}
      {mode === 'create' && <S.GridCell />}
      {mode === 'update' && (
        <>
          <S.GridCell />
          <S.GridCell />
        </>
      )}
    </>
  );
};

export default RecordGridHead;
