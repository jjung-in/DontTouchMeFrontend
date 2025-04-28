import Input from '@_components/Common/Input/Input';
import TagInput from '@_components/Common/TagInput/TagInput';
import AddressModal from '@_components/Modal/AddressModal/AddressModal';
import { useThumbnailUploader } from '@_hooks/custom/useThumbnailUploader';
import { ErrorTextStyle } from '@_styles/event';
import { TEventDetailResponse, TEventFormErrors, TEventFormValues } from '@_types/events.type';
import { validateEventForm } from '@_utils/events';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import EventDateField from '../EventDateField/EventDateField';
import EventFormButtons from '../EventFormButtons/EventFormButtons';
import EventInfoBoxField from '../EventInfoBoxField/EventInfoBoxField';
import EventInputField from '../EventInputField/EventInputField';
import EventNumberField from '../EventNumberField/EventNumberField';
import EventSwitchField from '../EventSwitchField/EventSwitchField';
import EventTextField from '../EventTextField/EventTextField';
import EventTypeField from '../EventTypeField/EventTypeField';
import ThumbnailUploader from '../ThumbnailUploader/ThumbnailUploader';
import * as S from './EventForm.styles';

interface Props {
  mode: 'create' | 'update' | 'read';
  event?: TEventDetailResponse;
  onSubmit?: (formValues: TEventFormValues, thumbnailFile: File | null) => void;
  onEventDelete?: () => void;
}

const EventForm = ({ mode, event, onSubmit, onEventDelete }: Props) => {
  const eventId = Number(useParams().eventId);
  const initialFormValues: TEventFormValues =
    mode === 'update' && event
      ? {
          ...event,
          otherEventType: event.eventType === '기타' ? event.eventType : '',
          isName: event.eventInfoItems.includes('이름'),
          isTag: event.eventInfoItems.includes('태그'),
          isImage: event.eventInfoItems.includes('사진 첨부'),
          isTarget: event.eventInfoItems.includes('입금대상'),
          isSend: event.eventInfoItems.includes('감사장'),
        }
      : {
          thumbnailUrl: '',
          eventName: '',
          eventType: '결혼식',
          otherEventType: '',
          eventDate: '',
          address: '',
          participants: '',
          isName: false,
          isTag: false,
          tags: [],
          isImage: false,
          isTarget: false,
          targets: [],
          isSend: false,
          sendType: 'EMAIL',
        };
  const [formValues, setFormValues] = useState<TEventFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<TEventFormErrors>({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { thumbnailFile, thumbnailPreview, handleThumbnailChange, handleThumbnailReset } = useThumbnailUploader(
    formValues.thumbnailUrl,
  );

  const handleChange = (key: keyof TEventFormValues, value: string | number | boolean | string[]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = () => {
    const errors = validateEventForm(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    onSubmit?.(formValues, thumbnailFile);
  };

  if (mode === 'read') {
    return (
      <S.Container>
        <S.FormArea>
          <ThumbnailUploader thumbnailPreview={event?.thumbnailUrl || ''} isReadonly={true} />
          <S.FieldArea>
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
          </S.FieldArea>
        </S.FormArea>
        <EventFormButtons mode={mode} eventId={eventId} onSubmit={handleSubmit} onDelete={onEventDelete} />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FormArea>
        <ThumbnailUploader
          thumbnailPreview={thumbnailPreview}
          onChange={handleThumbnailChange}
          onReset={handleThumbnailReset}
          isReadonly={false}
        />
        <S.FieldArea>
          <EventInputField
            label="이벤트명"
            error={formErrors.eventName}
            isRequired={true}
            value={formValues.eventName}
            onChange={(e) => handleChange('eventName', e.target.value)}
            maxLength={20}
            placeholder="이벤트명을 입력하세요."
          />
          <EventTypeField
            label="이벤트 유형"
            value={formValues.eventType ?? ''}
            onChange={(val) => handleChange('eventType', val)}
            otherValue={formValues.otherEventType}
            onOtherChange={(val) => handleChange('otherEventType', val)}
            error={formErrors.eventType}
            isRequired={true}
          />
          <EventDateField
            label="이벤트 일정"
            error={formErrors.eventDate}
            date={formValues.eventDate || null}
            onChange={(value) => handleChange('eventDate', value)}
            isRequired={true}
          />
          <EventInputField
            label="이벤트 장소"
            error={formErrors.address}
            isRequired={true}
            value={formValues.address}
            onClick={() => setIsAddressModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsAddressModalOpen(true);
            }}
            placeholder="장소를 입력하세요."
            readOnly
          />
          <AddressModal
            isOpen={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onSelectAddress={(selectedAddress) => handleChange('address', selectedAddress)}
          />
          <EventNumberField
            label="예상 인원"
            unit="명"
            value={formValues.participants || ''}
            onChange={(e) => handleChange('participants', Number(e.target.value))}
            min={1}
          />
          <EventInfoBoxField label="입출금 항목" variant="box">
            <EventSwitchField label="입출금 분류" checked={true} isReadonly={true} />
            <EventSwitchField label="입출금 내역명" checked={true} isReadonly={true} />
            <EventSwitchField label="금액" checked={true} isReadonly={true} />
            <EventSwitchField
              label="이름"
              checked={formValues.isName}
              onToggle={(checked) => handleChange('isName', checked)}
            />
            <EventSwitchField
              label="태그"
              checked={formValues.isTag}
              onToggle={(checked) => handleChange('isTag', checked)}
            >
              {formValues.isTag && (
                <>
                  <TagInput
                    tags={formValues.tags || []}
                    setTags={(newTags) =>
                      handleChange('tags', typeof newTags === 'function' ? newTags(formValues.tags || []) : newTags)
                    }
                    isError={!!formErrors.tags}
                  />
                  {formErrors.tags && <ErrorTextStyle>{formErrors.tags}</ErrorTextStyle>}
                </>
              )}
            </EventSwitchField>
            <EventSwitchField
              label="사진 첨부"
              checked={formValues.isImage}
              onToggle={(checked) => handleChange('isImage', checked)}
            />
            <EventSwitchField
              label="입금 대상"
              checked={formValues.isTarget}
              onToggle={(checked) => handleChange('isTarget', checked)}
            >
              {formValues.isTarget && (
                <>
                  <TagInput
                    tags={formValues.targets || []}
                    setTags={(newTargets) =>
                      handleChange(
                        'targets',
                        typeof newTargets === 'function' ? newTargets(formValues.targets || []) : newTargets,
                      )
                    }
                    isError={!!formErrors.targets}
                  />
                  {formErrors.targets && <ErrorTextStyle>{formErrors.targets}</ErrorTextStyle>}
                </>
              )}
            </EventSwitchField>
            <EventSwitchField
              label="감사장"
              checked={formValues.isSend}
              onToggle={(checked) => handleChange('isSend', checked)}
            >
              {formValues.isSend && (
                <Input
                  as="select"
                  value={formValues.sendType || undefined}
                  onChange={(e) => handleChange('sendType', e.target.value)}
                >
                  <option value="EMAIL">이메일</option>
                  <option value="PHONE">문자</option>
                </Input>
              )}
            </EventSwitchField>
          </EventInfoBoxField>
        </S.FieldArea>
      </S.FormArea>
      <EventFormButtons mode={mode} eventId={eventId} onSubmit={handleSubmit} onDelete={onEventDelete} />
    </S.Container>
  );
};

export default EventForm;
