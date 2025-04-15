import { TCreateEventRequest, TEventDetailResponse, TFormErrors, TUpdateEventRequest } from '@_types/events.type';
import { useParams } from 'react-router-dom';
import * as S from './EventForm.styles';
import { useState } from 'react';
import AddressModal from '@_components/Modal/AddressModal/AddressModal';
import TagInput from '@_components/Common/TagInput/TagInput';
import Input from '@_components/Common/Input/Input';
import ThumbnailUploader from '../ThumbnailUploader/ThumbnailUploader';
import { useThumbnailUploader } from '@_hooks/custom/useThumbnailUploader';
import EventFormButtons from '../EventFormButtons/EventFormButtons';
import EventInputField from '../EventInputField/EventInputField';
import EventTextField from '../EventTextField/EventTextField';
import EventTypeField from '../EventTypeField/EventTypeField';
import EventDateField from '../EventDateField/EventDateField';
import EventNumberField from '../EventNumberField/EventNumberField';
import EventInfoBoxField from '../EventInfoBoxField/EventInfoBoxField';
import EventSwitchField from '../EventSwitchField/EventSwitchField';
import { ErrorTextStyle } from '@_styles/event';

interface Props {
  mode: 'create' | 'update' | 'read';
  event?: TEventDetailResponse;
  formValues?: TCreateEventRequest | TUpdateEventRequest;
  formErrors?: TFormErrors;
  onSubmit?: (thumbnailFile: File | null) => void;
  handleDelete?: () => void;
  handleChange?: (
    key: keyof (TCreateEventRequest | TUpdateEventRequest),
    value: string | number | boolean | string[] | null,
  ) => void;
  otherEventType?: string;
  setOtherEventType?: React.Dispatch<React.SetStateAction<string>>;
  isTag?: boolean;
  setIsTag?: React.Dispatch<React.SetStateAction<boolean>>;
  isTarget?: boolean;
  setIsTarget?: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm = ({
  mode,
  event,
  formValues,
  formErrors,
  onSubmit,
  handleDelete,
  handleChange,
  otherEventType,
  setOtherEventType,
  isTag,
  setIsTag,
  isTarget,
  setIsTarget,
}: Props) => {
  const eventId = Number(useParams().eventId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { thumbnailFile, thumbnailPreview, handleThumbnailChange, handleThumbnailReset } = useThumbnailUploader(
    formValues?.thumbnailUrl,
  );

  const handleSubmit = () => {
    onSubmit?.(thumbnailFile);
  };

  return (
    <S.Container>
      <S.FormArea>
        <ThumbnailUploader
          thumbnailPreview={mode === 'read' ? event?.thumbnailUrl || '' : thumbnailPreview}
          onChange={handleThumbnailChange}
          onReset={handleThumbnailReset}
          isReadonly={mode === 'read'}
        />
        <S.FieldArea>
          {mode === 'read' ? (
            <>
              <EventTextField label="이벤트명" isRequired={true}>
                {event?.eventName}
              </EventTextField>
              <EventTextField label="이벤트 유형" isRequired={true}>
                {event?.eventType}
              </EventTextField>
              <EventTextField label="이벤트 일정" isRequired={true}>
                {event?.eventDate}
              </EventTextField>
              <EventTextField label="이벤트 장소" isRequired={true}>
                {event?.address}
              </EventTextField>
              {event && event.participants > 0 && (
                <EventTextField label="예상 인원">{event?.participants}명</EventTextField>
              )}
              <EventInfoBoxField label="입출금 항목" variant="textbox">
                {event?.eventInfoItems.map((item, index) => <span key={index}>{item}</span>)}
              </EventInfoBoxField>
            </>
          ) : (
            <>
              <EventInputField
                label="이벤트명"
                error={formErrors?.eventName}
                isRequired={true}
                value={formValues?.eventName}
                onChange={(e) => handleChange?.('eventName', e.target.value)}
                maxLength={20}
                placeholder="이벤트명을 입력하세요."
              />
              <EventTypeField
                label="이벤트 유형"
                value={formValues?.eventType ?? ''}
                onChange={(val) => handleChange?.('eventType', val)}
                otherValue={otherEventType}
                onOtherChange={setOtherEventType}
                error={formErrors?.eventType}
                isRequired={true}
              />
              <EventDateField
                label="이벤트 일정"
                error={formErrors?.eventDate}
                date={formValues?.eventDate || null}
                onChange={(value) => handleChange?.('eventDate', value)}
                isRequired={true}
              />
              <EventInputField
                label="이벤트 장소"
                error={formErrors?.address}
                isRequired={true}
                value={formValues?.address}
                onClick={() => setIsModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsModalOpen(true);
                }}
                placeholder="장소를 입력하세요."
                readOnly
              />
              <AddressModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectAddress={(selectedAddress) => handleChange?.('address', selectedAddress)}
              />
              <EventNumberField
                label="예상 인원"
                unit="명"
                value={formValues?.participants || ''}
                onChange={(e) => handleChange?.('participants', Number(e.target.value))}
                min={1}
              />
              <EventInfoBoxField label="입출금 항목" variant="box">
                <EventSwitchField label="입출금 분류" checked={true} isReadonly={true} />
                <EventSwitchField label="입출금 내역명" checked={true} isReadonly={true} />
                <EventSwitchField label="금액" checked={true} isReadonly={true} />
                <EventSwitchField
                  label="이름"
                  checked={formValues?.isName || false}
                  onToggle={(checked) => handleChange?.('isName', checked)}
                />
                <EventSwitchField label="태그" checked={isTag || false} onToggle={(checked) => setIsTag?.(checked)}>
                  {isTag && (
                    <>
                      <TagInput
                        tags={formValues?.tags || []}
                        setTags={(newTags) =>
                          handleChange?.(
                            'tags',
                            typeof newTags === 'function' ? newTags(formValues?.tags || []) : newTags,
                          )
                        }
                        isError={!!formErrors?.tags || false}
                      />
                      {formErrors?.tags && <ErrorTextStyle>{formErrors?.tags}</ErrorTextStyle>}
                    </>
                  )}
                </EventSwitchField>
                <EventSwitchField
                  label="사진 첨부"
                  checked={formValues?.isImage || false}
                  onToggle={(checked) => handleChange?.('isImage', checked)}
                />
                <EventSwitchField
                  label="입금 대상"
                  checked={isTarget || false}
                  onToggle={(checked) => setIsTarget?.(checked)}
                >
                  {isTarget && (
                    <>
                      <TagInput
                        tags={formValues?.targets || []}
                        setTags={(newTargets) =>
                          handleChange?.(
                            'targets',
                            typeof newTargets === 'function' ? newTargets(formValues?.targets || []) : newTargets,
                          )
                        }
                        isError={!!formErrors?.targets || false}
                      />
                      {formErrors?.targets && <ErrorTextStyle>{formErrors?.targets}</ErrorTextStyle>}
                    </>
                  )}
                </EventSwitchField>
                <EventSwitchField
                  label="감사장"
                  checked={formValues?.isSend || false}
                  onToggle={(checked) => handleChange?.('isSend', checked)}
                >
                  {formValues?.isSend && (
                    <Input
                      as="select"
                      value={formValues?.sendType || undefined}
                      onChange={(e) => handleChange?.('sendType', e.target.value)}
                    >
                      <option value="EMAIL">이메일</option>
                      <option value="PHONE">문자</option>
                    </Input>
                  )}
                </EventSwitchField>
              </EventInfoBoxField>
            </>
          )}
        </S.FieldArea>
      </S.FormArea>
      <EventFormButtons mode={mode} eventId={eventId} onSubmit={handleSubmit} onDelete={handleDelete} />
    </S.Container>
  );
};

export default EventForm;
