import Button from '@_components/Common/Button/Button';
import CustomSelect from '@_components/Common/CustomSelect/CustomSelect';
import Input from '@_components/Common/Input/Input';
import TagSelect from '@_components/Common/TagSelect/TagSelect';
import FileInput from '@_components/FileInput/FileInput';
import { TEventDetailResponse } from '@_types/events.type';
import { TRecordFormErrors, TRecordFormValues, TRecordItem } from '@_types/records.type';
import { formatNumber, recordConfig } from '@_utils/records';
import * as S from './UpdateRecordRow.styles';

interface Props {
  event: TEventDetailResponse;
  record: TRecordItem;
  errors: TRecordFormErrors | null;
  activeRow: number | null;
  updatedValue: TRecordFormValues | null;
  onChange: (key: keyof TRecordFormValues, value: string | number | string[] | File | null) => void;
  onUpdate: (record: TRecordItem) => void;
  onDelete: () => void;
}

const UpdateRecordRow = ({ event, record, errors, activeRow, updatedValue, onChange, onUpdate, onDelete }: Props) => {
  const recordId = record.eventDetailId;

  return (
    <>
      {event.eventInfoItems.map((item) => {
        const key = `${recordId}-${item}`;
        const config = recordConfig[item];

        if (!config) {
          return <S.GridCell key={key}>-</S.GridCell>;
        }

        const type = config?.type;
        const element = config?.element;
        const value = activeRow !== recordId ? record[type] : updatedValue?.[type];

        if (activeRow !== recordId) {
          if (element === 'tagSelect') {
            return (
              <S.GridCell key={key}>
                <TagSelect options={[]} value={Array.isArray(value) ? value : []} isReadOnly={true} />
              </S.GridCell>
            );
          }

          return (
            <S.GridCell key={key}>
              <Input as="span" variant="recordtext" fullWidth={true}>
                {config.type === 'price' && (typeof value === 'number' || typeof value === 'string')
                  ? formatNumber(value)
                  : typeof value !== 'object'
                    ? value
                    : ''}
              </Input>
            </S.GridCell>
          );
        }

        if (element === 'select') {
          return (
            <S.GridCell key={key}>
              <CustomSelect
                options={(type === 'target' ? ['', ...event.targets] : config.options) || []}
                value={typeof value === 'string' ? value : ''}
                onChange={(val) => onChange(type, val)}
                isShowArrow={type === 'type' || type === 'target'}
                isInput={type === 'price'}
                isPrice={type === 'price'}
                isError={errors?.[type]}
              />
            </S.GridCell>
          );
        }

        if (element === 'text' && typeof value !== 'object') {
          return (
            <S.GridCell key={key}>
              <Input
                type="text"
                value={value}
                onChange={(e) => onChange(type, e.target.value)}
                maxLength={type === 'contact' ? 20 : 10}
                formType="record"
                state={errors?.[type] ? 'error' : 'default'}
              />
            </S.GridCell>
          );
        }

        if (element === 'tagSelect') {
          return (
            <S.GridCell key={key}>
              <TagSelect
                options={type === 'tags' ? event.tags : []}
                value={Array.isArray(value) ? value : []}
                onChange={(val) => onChange(type, val)}
              />
            </S.GridCell>
          );
        }

        if (element === 'file') {
          return (
            <S.GridCell key={key}>
              <FileInput onChange={(e) => onChange('imageFile', e.target.files?.[0] ?? null)} />
            </S.GridCell>
          );
        }

        return <S.GridCell key={key}>-</S.GridCell>;
      })}
      <S.GridCell key={`row-${recordId}-update`}>
        <Button onClick={() => onUpdate(record)} variant={activeRow === recordId ? 'secondary' : 'primary'}>
          {activeRow === recordId ? '저장' : '수정'}
        </Button>
      </S.GridCell>
      <S.GridCell key={`row-${recordId}-delete`}>
        <Button onClick={onDelete} variant="primary">
          삭제
        </Button>
      </S.GridCell>
    </>
  );
};

export default UpdateRecordRow;
