import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';
import Input from '@_components/Common/Input/Input';

/**
 * EventInputField 컴포넌트 (이벤트 폼에서 사용되는 라벨, 에러 메시지를 포함한 인풋 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param error - 유효성 검사 실패 시 표시할 에러 메시지
 * @param isRequired - 필수 입력 항목일 경우 표시 여부
 * @param ...props - input 요소에 전달될 기타 속성 (value, placeholder, onChange 등)
 */

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isRequired?: boolean;
}

const EventInputField = ({ label, error, isRequired = false, ...props }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>
        {label}
        {isRequired && <img src={required} alt="필수 입력" />}
      </FieldLabelStyle>
      <Input type="text" state={error ? 'error' : 'default'} {...props} />
      {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
    </FieldContainerStyle>
  );
};

export default EventInputField;
