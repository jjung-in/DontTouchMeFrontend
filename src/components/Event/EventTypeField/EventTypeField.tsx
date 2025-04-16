import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';
import Input from '@_components/Common/Input/Input';

/**
 * EventTypeField 컴포넌트 (이벤트 유형을 선택할 수 있는 셀렉트 필드 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param error - 유효성 검사 실패 시 표시할 에러 메시지
 * @param value - 현재 선택된 값
 * @param onChange - 셀렉트 값이 변경될 때 호출되는 함수
 * @param otherValue - '기타' 선택 시 입력된 텍스트 값
 * @param onOtherChange - '기타' 입력값이 변경될 때 호출되는 함수수
 * @param isRequired - 필수 입력 항목일 경우 표시 여부
 */

interface Props {
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  isRequired?: boolean;
}

const EventTypeField = ({ label, error, value, onChange, otherValue, onOtherChange, isRequired = false }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>
        {label}
        {isRequired && <img src={required} alt="필수 입력" />}
      </FieldLabelStyle>
      <Input as="select" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="결혼식">결혼식</option>
        <option value="장례식">장례식</option>
        <option value="기타">기타</option>
      </Input>
      {value === '기타' && (
        <Input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          maxLength={10}
          placeholder="ex) 모임"
          state={error ? 'error' : 'default'}
        />
      )}
      {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
    </FieldContainerStyle>
  );
};

export default EventTypeField;
