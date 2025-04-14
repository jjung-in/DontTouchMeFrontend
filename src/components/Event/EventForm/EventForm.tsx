import { TCreateEventRequest, TEventDetailResponse, TFormErrors, TUpdateEventRequest } from '@_types/events.type';
import { useParams } from 'react-router-dom';
import * as S from './EventForm.styles';
import required from '@_assets/images/required.png';
import { useState } from 'react';
import AddressModal from '@_components/Modal/AddressModal/AddressModal';
import CustomDatePicker from '@_components/Common/CustomDatePicker/CustomDatePicker';
import Switch from '@_components/Common/Switch/Switch';
import TagInput from '@_components/Common/TagInput/TagInput';
import Input from '@_components/Common/Input/Input';
import ThumbnailUploader from '../ThumbnailUploader/ThumbnailUploader';
import { useThumbnailUploader } from '@_hooks/custom/useThumbnailUploader';
import EventFormButtons from '../EventFormButtons/EventFormButtons';
import EventInputField from '../EventInputField/EventInputField';
import EventTextField from '../EventTextField/EventTextField';

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
    <S.Card>
      <S.FormArea>
        <ThumbnailUploader
          thumbnailPreview={mode === 'read' ? event?.thumbnailUrl || '' : thumbnailPreview}
          onChange={handleThumbnailChange}
          onReset={handleThumbnailReset}
          isReadonly={mode === 'read'}
        />
        <S.FieldSection>
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
              <S.FieldGroup>
                <S.Label>
                  이벤트 유형
                  <img src={required} alt="필수 입력" />
                </S.Label>
                <Input
                  as="select"
                  value={formValues?.eventType}
                  onChange={(e) => handleChange?.('eventType', e.target.value)}
                >
                  <option value="결혼식">결혼식</option>
                  <option value="장례식">장례식</option>
                  <option value="기타">기타</option>
                </Input>
                {formValues?.eventType === '기타' && (
                  <Input
                    type="text"
                    value={otherEventType}
                    onChange={(e) => setOtherEventType?.(e.target.value)}
                    maxLength={10}
                    placeholder="ex) 모임"
                    state={formErrors?.eventType ? 'error' : 'default'}
                  />
                )}
                {formErrors?.eventName && <S.ErrorText>{formErrors?.eventType}</S.ErrorText>}
              </S.FieldGroup>
              <S.FieldGroup>
                <S.Label>
                  이벤트 일정
                  <img src={required} alt="필수 입력" />
                </S.Label>
                <CustomDatePicker
                  date={formValues?.eventDate || null}
                  onChange={(value) => handleChange?.('eventDate', value)}
                  isError={!!formErrors?.eventDate || false}
                />
                {formErrors?.eventDate && <S.ErrorText>{formErrors?.eventDate}</S.ErrorText>}
              </S.FieldGroup>
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
              <S.FieldGroup>
                <S.Label>예상 인원</S.Label>
                <S.NumberInputWrapper>
                  <Input
                    type="number"
                    min={1}
                    value={formValues?.participants || ''}
                    onChange={(e) => handleChange?.('participants', Number(e.target.value))}
                    variant="number"
                    fullWidth={true}
                  />
                </S.NumberInputWrapper>
              </S.FieldGroup>
            </>
          )}
          <S.FieldGroup>
            <S.Label>입출금 항목</S.Label>
            {mode === 'read' ? (
              <Input as="div" variant="textbox">
                {event?.eventInfoItems.map((item, index) => <span key={index}>{item}</span>)}
              </Input>
            ) : (
              <Input as="div" variant="box">
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText $readonly={true}>입출금 분류</S.DetailText>
                    <Switch checked={true} />
                  </S.DetailSwitchBox>
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText $readonly={true}>입출금 내역명</S.DetailText>
                    <Switch checked={true} />
                  </S.DetailSwitchBox>
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText $readonly={true}>금액</S.DetailText>
                    {/* 선택 */}
                    <Switch checked={true} />
                  </S.DetailSwitchBox>
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText>이름</S.DetailText>
                    <Switch
                      checked={formValues?.isName || false}
                      onChange={(checked) => handleChange?.('isName', checked)}
                    />
                  </S.DetailSwitchBox>
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText>태그</S.DetailText>
                    <Switch checked={isTag || false} onChange={(checked) => setIsTag?.(checked)} />
                  </S.DetailSwitchBox>
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
                      {formErrors?.tags && <S.ErrorText>{formErrors?.tags}</S.ErrorText>}
                    </>
                  )}
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText>사진 첨부</S.DetailText>
                    <Switch
                      checked={formValues?.isImage || false}
                      onChange={(checked) => handleChange?.('isImage', checked)}
                    />
                  </S.DetailSwitchBox>
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText>입금 대상</S.DetailText>
                    <Switch checked={isTarget || false} onChange={(checked) => setIsTarget?.(checked)} />
                  </S.DetailSwitchBox>
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
                      {formErrors?.targets && <S.ErrorText>{formErrors?.targets}</S.ErrorText>}
                    </>
                  )}
                </S.DetailGroup>
                <S.DetailGroup>
                  <S.DetailSwitchBox>
                    <S.DetailText>감사장</S.DetailText>
                    <Switch
                      checked={formValues?.isSend || false}
                      onChange={(checked) => handleChange?.('isSend', checked)}
                    />
                  </S.DetailSwitchBox>
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
                </S.DetailGroup>
              </Input>
            )}
          </S.FieldGroup>
        </S.FieldSection>
      </S.FormArea>
      <EventFormButtons mode={mode} eventId={eventId} onSubmit={handleSubmit} onDelete={handleDelete} />
    </S.Card>
  );
};

export default EventForm;
