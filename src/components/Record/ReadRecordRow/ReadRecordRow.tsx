import Input from '@_components/Common/Input/Input';
import TagSelect from '@_components/Common/TagSelect/TagSelect';
import { TEventDetailResponse } from '@_types/events.type';
import { TRecordItem } from '@_types/records.type';
import { formatNumber, recordConfig } from '@_utils/records';
import ImagePreviewCell from '../ImagePreviewCell/ImagePreviewCell';
import * as S from './ReadRecordRow.styles';

interface Props {
  event: TEventDetailResponse;
  record: TRecordItem;
}

const ReadRecordRow = ({ event, record }: Props) => {
  const recordId = record.eventDetailId;

  return (
    <>
      {event.eventInfoItems.map((item) => {
        const key = `${recordId}-${item}`;
        const config = recordConfig[item];

        if (!config) {
          return <S.GridCell key={key}>-</S.GridCell>;
        }

        const type = config.type;
        const element = config.element;
        const value = record[type];

        if (element === 'tagSelect') {
          return (
            <S.GridCell key={key}>
              <TagSelect options={[]} value={Array.isArray(value) ? value : []} isReadOnly={true} />
            </S.GridCell>
          );
        }

        if (element === 'file') {
          return (
            <S.GridCell key={key}>
              <ImagePreviewCell imageUrl={record.image} />
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
      })}
    </>
  );
};

export default ReadRecordRow;
