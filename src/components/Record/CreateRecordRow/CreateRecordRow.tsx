import Button from '@_components/Common/Button/Button';
import CustomSelect from '@_components/Common/CustomSelect/CustomSelect';
import Input from '@_components/Common/Input/Input';
import TagSelect from '@_components/Common/TagSelect/TagSelect';
import { TEventDetailResponse } from '@_types/events.type';
import { TRecordFormErrors, TRecordFormValues } from '@_types/records.type';
import { recordConfig } from '@_utils/records';
import * as S from './CreateRecordRow.styles';

interface Props {
  event: TEventDetailResponse;
  row: { id: number; values: TRecordFormValues };
  errors: Record<number, TRecordFormErrors>;
  isFirstRow: boolean;
  onChange: (id: number, key: keyof TRecordFormValues, value: string | number | string[] | null) => void;
  onAddRow: () => void;
  onDeleteRow: (id: number) => void;
}

const CreateRecordRow = ({ event, row, errors, isFirstRow, onChange, onAddRow, onDeleteRow }: Props) => {
  const { id, values } = row;

  return (
    <>
      {event.eventInfoItems.map((item) => {
        const key = `${id}-${item}`;
        const config = recordConfig[item];
        const type = config?.type;
        const element = config?.element;
        const value = values[type];

        if (!config) {
          return <S.GridCell key={key}>-</S.GridCell>;
        }

        if (element === 'select') {
          return (
            <S.GridCell key={key}>
              <CustomSelect
                options={(type === 'target' ? ['', ...event.targets] : config.options) || []}
                value={typeof value === 'string' ? value : ''}
                onChange={(val) => onChange(id, type, val)}
                isShowArrow={type === 'type' || type === 'target'}
                isInput={type === 'price'}
                isPrice={type === 'price'}
                isError={errors[id]?.[type]}
              />
            </S.GridCell>
          );
        }

        if (element === 'text') {
          return (
            <S.GridCell key={key}>
              <Input
                type="text"
                value={value}
                onChange={(e) => onChange(id, type, e.target.value)}
                maxLength={type === 'contact' ? 20 : 10}
                formType="record"
                state={errors[id]?.[type] ? 'error' : 'default'}
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
                onChange={(val) => onChange(id, type, val)}
              />
            </S.GridCell>
          );
        }

        return <S.GridCell key={key}>-</S.GridCell>;
      })}
      <S.GridCell>
        {isFirstRow ? (
          <Button onClick={onAddRow} variant="primary">
            추가
          </Button>
        ) : (
          <Button onClick={() => onDeleteRow(id)} variant="default">
            삭제
          </Button>
        )}
      </S.GridCell>
    </>
  );
};

export default CreateRecordRow;
