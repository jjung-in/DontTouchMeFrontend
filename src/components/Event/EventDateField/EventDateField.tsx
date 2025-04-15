import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';
import CustomDatePicker from '@_components/Common/CustomDatePicker/CustomDatePicker';

/**
 * EventDateField 컴포넌트 (이벤트 날짜를 선택할 수 있는 데이트 필드 컴포넌트)
 * @param label - 필드 상단에 표시할 텍스트 라벨
 * @param error - 유효성 검사 실패 시 표시할 에러 메시지
 * @param date - 현재 선택된 날짜 값
 * @param onChange - 날짜가 변경될 때 호출되는 콜백 함수
 * @param isRequired - 필수 입력 항목일 경우 표시 여부
 */

interface Props {
  label: string;
  error?: string;
  date: string | null;
  onChange: (value: string) => void;
  isRequired?: boolean;
}

const EventDateField = ({ label, error, date, onChange, isRequired = false }: Props) => {
  return (
    <FieldContainerStyle>
      <FieldLabelStyle>
        {label}
        {isRequired && <img src={required} alt="필수 입력" />}
      </FieldLabelStyle>
      <CustomDatePicker date={date} onChange={onChange} isError={!!error} />
      {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
    </FieldContainerStyle>
  );
};

export default EventDateField;
