import Input from '@_components/Common/Input/Input';
import { FieldContainerStyle, FieldLabelStyle } from '@_styles/event';

/**
 * EventInfoBoxField 컴포넌트 (이벤트 폼에서 입출금 관련 정보 블록을 표시하는 박스 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param variant - 필드 스타일 타입 (textbox | box)
 * @param children - 표시할 콘텐츠
 */

interface Props {
  label: string;
  variant?: 'textbox' | 'box';
  children: React.ReactNode;
}

const EventInfoBoxField = ({ label, variant = 'textbox', children }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>{label}</FieldLabelStyle>
      <Input as="div" variant={variant}>
        {children}
      </Input>
    </FieldContainerStyle>
  );
};

export default EventInfoBoxField;
