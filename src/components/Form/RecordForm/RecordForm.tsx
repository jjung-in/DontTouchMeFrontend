import { useParams } from 'react-router-dom';
import { TEventDetailResponse } from '@_types/events.type';
import { TCreateRecordRequest } from '@_types/records.type';
import * as S from './RecordForm.styles';
import required from '@_assets/images/required.png';
import CustomSelect from '@_components/Select/CustomSelect/CustomSelect';
import { downloadExcelTemplate } from '@_api/excel';
import { downloadBlobFile } from '@_utils/downloadFile';

interface InputConfigType {
  type: keyof TCreateRecordRequest;
  label: string;
  width: string;
  required?: boolean;
}

const inputConfig: Record<string, InputConfigType> = {
  '입출금 분류': { type: 'type', label: '입출금 분류', width: '120px', required: true },
  '입출금 내역명': { type: 'history', label: '입출금 내역명', width: '180px', required: true },
  금액: { type: 'price', label: '금액', width: '120px', required: true },
  이름: { type: 'name', label: '이름', width: '180px' },
  태그: { type: 'tags', label: '태그', width: '200px' },
  '사진 첨부': { type: 'imageUrl', label: '사진 첨부', width: '120px' },
  입금대상: { type: 'target', label: '입금 대상', width: '100px' },
  감사장: { type: 'contact', label: '연락처', width: '220px' },
};

const getGridTemplate = (items: string[]) => {
  const widths = items.map((item) => {
    return inputConfig[item]?.width || '120px';
  });
  return [...widths, '104px'].join(' ');
};

interface Props {
  mode: 'create' | 'update';
  event: TEventDetailResponse;
  rows: { id: number; values: TCreateRecordRequest }[];
  setRows: React.Dispatch<React.SetStateAction<{ id: number; values: TCreateRecordRequest }[]>>;
  handleSubmit: () => void;
  handleChange: (id: number, key: keyof TCreateRecordRequest, value: string | number | string[] | null) => void;
}

const RecordForm = ({ mode, event, rows, setRows, handleSubmit, handleChange }: Props) => {
  const eventId = Number(useParams().eventId);

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
          // target: '',
          // sendType: '',
          contact: '',
        },
      },
    ]);
  };

  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleDownloadExcel = async () => {
    try {
      const data = await downloadExcelTemplate(eventId);
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
      downloadBlobFile(blob, 'PAYble_template.xlsx');
    } catch {
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <S.Grid $gridTemplateColumns={getGridTemplate(event.eventInfoItems)}>
        <>
          {event.eventInfoItems.map((item) => (
            <S.GridCell key={`header-${item}`} $isHeader>
              {inputConfig[item]?.label || item}
              {inputConfig[item]?.required && <img src={required} alt="필수 입력" />}
            </S.GridCell>
          ))}
          <S.GridCell $isHeader />
        </>
        <>
          {rows.map((row, index) =>
            event.eventInfoItems
              .map((item) => {
                const config = inputConfig[item];

                if (!config) {
                  return <S.GridCell key={`${row.id}-${item}`}>-</S.GridCell>;
                }

                const value = row.values[config.type];
                const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                  handleChange(row.id, config.type, e.target.value);

                if (config.type === 'type') {
                  return (
                    <S.GridCell key={`${row.id}-${item}`}>
                      <CustomSelect
                        options={['입금', '출금']}
                        value={row.values.type}
                        onChange={(val) => handleChange(row.id, 'type', val)}
                        isShowArrow={true}
                      />
                    </S.GridCell>
                  );
                }

                if (config.type === 'price') {
                  return (
                    <S.GridCell key={`${row.id}-${item}`}>
                      <CustomSelect
                        options={['50000', '100000', '150000']}
                        value={'row.values.price'}
                        onChange={(val) => handleChange(row.id, 'price', val)}
                        isInput={true}
                        isPrice={true}
                      />
                    </S.GridCell>
                  );
                }

                if (config.type === 'contact') {
                  return (
                    <S.GridCell key={`${row.id}-${item}`}>
                      <S.Input type="text" value={value} onChange={onChange} />
                    </S.GridCell>
                  );
                }

                return (
                  <S.GridCell key={`${row.id}-${item}`}>
                    <S.Input type="text" maxLength={10} value={value} onChange={onChange} />
                  </S.GridCell>
                );
              })
              .concat(
                <S.GridCell key={`row-${row.id}-action`}>
                  {index === 0 ? (
                    <S.Button
                      onClick={() => handleAddRow()}
                      $textColor="#ffffff"
                      $bgColor="#3959a5"
                      $borderColor="#3959a5"
                    >
                      추가
                    </S.Button>
                  ) : (
                    <S.Button onClick={() => handleDeleteRow(row.id)} $borderColor="#b4b9c9">
                      삭제
                    </S.Button>
                  )}
                </S.GridCell>,
              ),
          )}
        </>
      </S.Grid>
      <S.ButtonArea>
        <S.LinkButton
          to={mode === 'create' ? `/events/${eventId}` : `/events/${eventId}/records`}
          $textColor="#3959a5"
          $borderColor="#3959a5"
        >
          이전
        </S.LinkButton>
        <S.Button onClick={handleDownloadExcel} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
          엑셀 양식 다운로드
        </S.Button>
        <S.Button $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
          엑셀 업로드
        </S.Button>
        <S.Button onClick={handleSubmit} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
          저장
        </S.Button>
      </S.ButtonArea>
    </>
  );
};

export default RecordForm;
