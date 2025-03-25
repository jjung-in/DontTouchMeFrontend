import { downloadExcelTemplate } from '@_api/excel';
import { useEventDetail } from '@_hooks/useEvents';
import { useCreateRecordsBatch } from '@_hooks/useRecords';
import { TCreateRecordRequest } from '@_types/records.type';
import { downloadBlobFile } from '@_utils/downloadFile';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface InputConfigType {
  type: keyof TCreateRecordRequest;
  label: string;
}

const inputConfig: Record<string, InputConfigType> = {
  '입출금 분류': { type: 'type', label: '입출금 분류' },
  '입출금 내역명': { type: 'history', label: '입출금 내역명' },
  금액: { type: 'price', label: '금액' },
  이름: { type: 'name', label: '이름' },
  태그: { type: 'tags', label: '태그' },
  '사진 첨부': { type: 'imageUrl', label: '사진 첨부' },
  입금대상: { type: 'target', label: '입금 대상' },
  감사장: { type: 'contact', label: '연락처' },
};

const RecordCreate = () => {
  const navigate = useNavigate();

  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: createRecordsBatch } = useCreateRecordsBatch();

  const [rows, setRows] = useState<{ id: number; values: TCreateRecordRequest }[]>([
    {
      id: Date.now(),
      values: {
        eventId: eventId,
        type: '입금',
        history: '',
        price: '',
        name: '',
        tags: [],
        imageUrl: '',
        target: '',
        contact: '',
      },
    },
  ]);

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

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        values: {
          eventId: eventId,
          type: '입금',
          history: '',
          price: '',
          name: '',
          tags: [],
          imageUrl: '',
          target: '',
          contact: '',
        },
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleChange = (rowId: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => {
    setRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, values: { ...row.values, [key]: value } } : row)),
    );
  };

  const handleSubmit = async () => {
    const payload = rows.map((row) => {
      const cleaned: TCreateRecordRequest = { eventId: eventId, type: '', history: '', price: '' };
      for (const [key, value] of Object.entries(row.values)) {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isEmptyString = value === '';
        const isNullish = value === null || value === undefined;
        if (!isEmptyArray && !isEmptyString && !isNullish) {
          cleaned[key as keyof TCreateRecordRequest] = value;
        }
      }
      return cleaned;
    });

    // 유효성 검사
    // if (!validateRecordForm(rows)) return;

    createRecordsBatch(payload, {
      onSuccess: () => {
        navigate(`/events/${eventId}/records`);
      },
      onError: (error) => {
        console.error('Error creating records:', error);
      },
    });
  };

  return (
    <div>
      <hr />
      <div>
        <h2>입출금 내역 등록</h2>
      </div>
      <hr />
      {isFetching ? (
        <div>Loading...</div>
      ) : data ? (
        <>
          <div>
            <Link to={`/events/${eventId}`}>이전</Link>
            <button onClick={handleDownloadExcel}>엑셀 양식 다운로드</button>
            <button>엑셀 업로드</button>
            <button onClick={handleSubmit}>저장</button>
          </div>
          <hr />
          <div>
            <table>
              <thead>
                <tr>
                  {data.eventInfoItems.map((item) => (
                    <th key={item}>{inputConfig[item]?.label || item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id}>
                    {data.eventInfoItems.map((item) => {
                      const config = inputConfig[item];

                      if (!config) {
                        return <td key={item}>-</td>;
                      }

                      if (config.type === 'type') {
                        return (
                          <td key={item}>
                            <select
                              value={row.values.type}
                              onChange={(e) => handleChange(row.id, 'type', e.target.value)}
                            >
                              <option value="입금">입금</option>
                              <option value="출금">출금</option>
                            </select>
                          </td>
                        );
                      }

                      if (config.type === 'history') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.history}
                              onChange={(e) => handleChange(row.id, 'history', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'price') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.price}
                              onChange={(e) => handleChange(row.id, 'price', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'name') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.name}
                              onChange={(e) => handleChange(row.id, 'name', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'tags') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.tags}
                              onChange={(e) => handleChange(row.id, 'tags', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'imageUrl') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.imageUrl}
                              onChange={(e) => handleChange(row.id, 'imageUrl', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'target') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.target}
                              onChange={(e) => handleChange(row.id, 'target', e.target.value)}
                            />
                          </td>
                        );
                      }

                      if (config.type === 'contact') {
                        return (
                          <td key={item}>
                            <input
                              type="text"
                              value={row.values.contact}
                              onChange={(e) => handleChange(row.id, 'contact', e.target.value)}
                            />
                          </td>
                        );
                      }
                    })}
                    <td>
                      <button onClick={handleAddRow}>추가</button>
                      {index !== 0 && <button onClick={() => handleDeleteRow(row.id)}>삭제</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>데이터 없어요</div>
      )}
      <hr />
    </div>
  );
};

export default RecordCreate;
