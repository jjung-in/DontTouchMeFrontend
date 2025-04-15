import Switch from '@_components/Common/Switch/Switch';
import * as S from './EventSwitchField.styles';

/**
 * EventSwitchField 컴포넌트 (이벤트 폼에서 사용되는 라벨과 추가 컨텐츠를 포함한 스위치 컴포넌트)
 * @param label - 필드에 표시할 텍스트 라벨
 * @param checked - 스위치의 현재 상태
 * @param onToggle - 스위치 토글 시 호출되는 콜백 함수
 * @param isReadonly - 스위치 비활성화 여부부
 * @param children - 표시할 콘텐츠
 */

interface Props {
  label: string;
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  isReadonly?: boolean;
  children?: React.ReactNode;
}

const EventSwitchField = ({ label, checked, onToggle, isReadonly, children }: Props) => {
  return (
    <S.Wrapper>
      <S.SwitchWrapper>
        <S.Label $isReadonly={isReadonly}>{label}</S.Label>
        <Switch checked={checked} onChange={onToggle} />
      </S.SwitchWrapper>
      {children}
    </S.Wrapper>
  );
};

export default EventSwitchField;
