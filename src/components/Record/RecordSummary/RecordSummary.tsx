import { TRecordSummaryResponse } from '@_types/records.type';
import * as S from './RecordSummary.styles';

interface Props {
  summary: TRecordSummaryResponse;
}

const RecordSummary = ({ summary }: Props) => {
  const incomeTotal = summary.totalDeposit;
  const expenseTotal = summary.totalWithdrawal;

  return (
    <S.Container>
      <S.Box>
        <S.Text>입금액</S.Text>
        <S.Amount>{incomeTotal.toLocaleString()}원</S.Amount>
      </S.Box>
      <S.Box>
        <S.Text>출금액</S.Text>
        <S.Amount>{expenseTotal.toLocaleString()}원</S.Amount>
      </S.Box>
      <S.Box>
        <S.Text>총 금액</S.Text>
        <S.Amount>{(incomeTotal - expenseTotal).toLocaleString()}원</S.Amount>
      </S.Box>
    </S.Container>
  );
};

export default RecordSummary;
