import { downloadExcelTemplate } from '@_api/excel';
import { downloadBlobFile } from '@_utils/downloadFile';
import { Link, useParams } from 'react-router-dom';

const RecordCreate = () => {
  const eventId = Number(useParams().eventId);

  const handleDownloadExcel = async () => {
    try {
      const data = await downloadExcelTemplate(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, 'PAYble_template.xlsx');
    } catch (error) {
      console.error('엑셀 다운로드 실패', error);
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <hr />
      <div>
        <h2>입출금 내역 등록</h2>
      </div>
      <hr />
      <div>
        <Link to={`/events/${eventId}`}>이전</Link>
        <button onClick={handleDownloadExcel}>엑셀 양식 다운로드</button>
        <button>엑셀 업로드</button>
        <button>저장</button>
      </div>
      <hr />
      <div>
      </div>
      <hr />
    </div>
  );
};

export default RecordCreate;
