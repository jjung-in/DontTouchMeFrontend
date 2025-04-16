import { FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';
import Input from '@_components/Common/Input/Input';

/**
 * EventTextField 컴포넌트 (이벤트 상세 페이지에서 사용되는 라벨 + 읽기 전용 텍스트 필드 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param isRequired - 필수 입력 항목일 경우 표시 여부
 * @param ...props - span 요소에 전달될 기타 속성
 */

interface Props extends React.InputHTMLAttributes<HTMLSpanElement> {
  label: string;
  isRequired?: boolean;
}

const EventTextField = ({ label, isRequired = false, ...props }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>
        {label}
        {isRequired && <img src={required} alt="필수 입력" />}
      </FieldLabelStyle>
      <Input as="span" {...props} />
    </FieldContainerStyle>
  );
};

export default EventTextField;
