import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import calendar from '@_assets/icons/calendar.png';
import * as S from './CustomDatePicker.styles';

interface Props {
  date: string | null;
  onChange: (date: string) => void;
  isError?: boolean;
}

const CustomDatePicker = ({ date, onChange, isError }: Props) => {
  const parsedDate = date ? parseISO(date) : null;

  return (
    <S.Wrapper $isError={isError}>
      <DatePicker
        locale={ko}
        selected={parsedDate}
        onChange={(date: Date | null) => {
          if (date) {
            onChange(format(date, 'yyyy-MM-dd'));
          } else {
            onChange('');
          }
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="일정을 선택하세요."
      />
      <S.Icon src={calendar} />
    </S.Wrapper>
  );
};

export default CustomDatePicker;
