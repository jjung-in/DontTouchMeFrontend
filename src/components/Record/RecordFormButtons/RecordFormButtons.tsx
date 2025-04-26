import { downloadExcelTemplate, exportExcelFile, importExcelFile } from '@_api/excel';
import BackButton from '@_components/Common/BackButton/BackButton';
import Button from '@_components/Common/Button/Button';
import { downloadBlobFile, isExcelFile } from '@_utils/excel';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './RecordFormButtons.styles';

interface Props {
  mode: 'create' | 'update' | 'read';
  eventId: number;
  onSubmit?: () => void;
}

const RecordFormButtons = ({ mode, eventId, onSubmit }: Props) => {
  const navigate = useNavigate();

  const handleDownloadExcel = async () => {
    try {
      const data = await downloadExcelTemplate(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, 'PAYble_template.xlsx');
    } catch {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleExcelExport = async () => {
    try {
      const data = await exportExcelFile(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, `PAYble_${eventId}.xlsx`);
    } catch {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!isExcelFile(selectedFile)) {
      alert('엑셀 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      return;
    }

    try {
      await importExcelFile(eventId, selectedFile);
      alert('엑셀 데이터가 성공적으로 업로드되었습니다!');
      navigate(`/events/${eventId}/records`);
    } catch {
      alert('엑셀 업로드 중 오류가 발생했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  if (mode === 'read') {
    return (
      <S.Wrapper>
        <Button as={Link} to={`/events/${eventId}`} variant="secondary" fontWeight="semibold">
          이전
        </Button>
        <Button as={Link} to={`/events/${eventId}/records/create`} variant="primary" fontWeight="semibold">
          등록
        </Button>
        <Button as={Link} to={`/events/${eventId}/records/update`} variant="primary" fontWeight="semibold">
          수정
        </Button>
        <Button onClick={handleExcelExport} variant="primary" fontWeight="semibold">
          엑셀 다운로드
        </Button>
        <Button as={Link} to={`/events/${eventId}/card`} variant="primary" fontWeight="semibold">
          감사장 전송
        </Button>
      </S.Wrapper>
    );
  }

  if (mode === 'create') {
    return (
      <S.Wrapper>
        <BackButton />
        <Button onClick={handleDownloadExcel} variant="primary" fontWeight="semibold">
          엑셀 양식 다운로드
        </Button>
        <label htmlFor="excel-upload">
          <Button as="p" variant="primary" fontWeight="semibold">
            엑셀 업로드
          </Button>
        </label>
        <input
          type="file"
          id="excel-upload"
          accept=".xls,.xlsx"
          onChange={handleExcelImport}
          style={{ display: 'none' }}
        />
        <Button onClick={onSubmit} variant="primary" fontWeight="semibold">
          저장
        </Button>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <Button as={Link} to={`/events/${eventId}/records`} variant="secondary" fontWeight="semibold">
        완료
      </Button>
    </S.Wrapper>
  );
};

export default RecordFormButtons;
