import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';
import Input from '@_components/Common/Input/Input';
import * as S from './EventNumberField.styles';

/**
 * EventNumberField 컴포넌트 (이벤트 폼에서 숫자를 입력하는 인풋 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param error - 유효성 검사 실패 시 표시할 에러 메시지
 * @param unit - 인풋 우측에 표시할 단위 텍스트트
 * @param isRequired - 필수 입력 항목일 경우 표시 여부
 * @param ...props - input 요소에 전달될 기타 속성 (value, placeholder, onChange 등)
 */

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  unit?: string;
  isRequired?: boolean;
}

const EventNumberField = ({ label, error, unit, isRequired = false, ...props }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>
        {label}
        {isRequired && <img src={required} alt="필수 입력" />}
      </FieldLabelStyle>
      <S.NumberInputWrapper $unit={unit}>
        <Input type="number" variant="number" fullWidth={true} {...props} />
      </S.NumberInputWrapper>
      {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
    </FieldContainerStyle>
  );
};

export default EventNumberField;
