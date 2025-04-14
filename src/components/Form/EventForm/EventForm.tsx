import { TCreateEventRequest, TEventDetailResponse, TFormErrors, TUpdateEventRequest } from '@_types/events.type';
import { useParams } from 'react-router-dom';
import * as S from './EventForm.styles';
import noimage from '@_assets/images/noimage.png';
import required from '@_assets/images/required.png';
import { useState } from 'react';
import AddressModal from '@_components/Modal/AddressModal/AddressModal';
import CustomDatePicker from '@_components/Common/CustomDatePicker/CustomDatePicker';
import Switch from '@_components/Common/Switch/Switch';
import TagInput from '@_components/Common/TagInput/TagInput';
import Button from '@_components/Common/Button/Button';
import { Link } from 'react-router-dom';
import Input from '@_components/Common/Input/Input';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

interface Props {
  mode: 'create' | 'update' | 'read';
  event?: TEventDetailResponse;
  formValues?: TCreateEventRequest | TUpdateEventRequest;
  formErrors?: TFormErrors;
  thumbnailPreview?: string;
  handleSubmit?: () => void;
  handleDelete?: () => void;
  handleChange?: (
    key: keyof (TCreateEventRequest | TUpdateEventRequest),
    value: string | number | boolean | string[] | null,
  ) => void;
  handleThumbnailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThumbnailReset?: () => void;
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
  thumbnailPreview,
  handleSubmit,
  handleDelete,
  handleChange,
  handleThumbnailChange,
  handleThumbnailReset,
  otherEventType,
  setOtherEventType,
  isTag,
  setIsTag,
  isTarget,
  setIsTarget,
}: Props) => {
  const eventId = Number(useParams().eventId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <S.Main>
      {mode === 'create' ? (
        <PageTitle
          title="이벤트 만들기"
          highlight="이벤트 만들기"
          subtitle="등록된 이벤트의 상세 정보를 확인하고, 수정합니다."
        />
      ) : (
        <PageTitle
          title="이벤트 상세 정보"
          highlight="이벤트 상세 정보"
          subtitle="등록된 이벤트의 상세 정보를 확인하고, 수정합니다."
        />
      )}
      <S.Card>
        <S.FormArea>
          <S.ImageSection>
            {mode === 'read' ? (
              <S.Thumbnail>
                {event?.thumbnailUrl ? <S.ThumbnailImage src={event?.thumbnailUrl} /> : <S.NoImage src={noimage} />}
              </S.Thumbnail>
            ) : (
              <>
                <S.Thumbnail>
                  {thumbnailPreview ? <S.ThumbnailImage src={thumbnailPreview} /> : <S.NoImage src={noimage} />}
                </S.Thumbnail>
                {thumbnailPreview ? (
                  <Button onClick={handleThumbnailReset} variant="primary">
                    취소
                  </Button>
                ) : (
                  <label htmlFor="thumbnail">
                    <Button as="p">사진 등록하기</Button>
                  </label>
                )}
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </S.ImageSection>
          <S.FieldSection>
            <S.FieldGroup>
              <S.Label>
                이벤트명
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <Input as="span">{event?.eventName}</Input>
              ) : (
                <Input
                  type="text"
                  maxLength={100}
                  placeholder="이벤트명을 입력하세요."
                  value={formValues?.eventName}
                  onChange={(e) => handleChange?.('eventName', e.target.value)}
                  state={formErrors?.eventName ? 'error' : 'default'}
                />
              )}
              {formErrors?.eventName && <S.ErrorText>{formErrors?.eventName}</S.ErrorText>}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 유형
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <Input as="span">{event?.eventType}</Input>
              ) : (
                <>
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
                      maxLength={10}
                      placeholder="ex) 모임"
                      value={otherEventType}
                      onChange={(e) => setOtherEventType?.(e.target.value)}
                      state={formErrors?.eventType ? 'error' : 'default'}
                    />
                  )}
                </>
              )}
              {formErrors?.eventName && <S.ErrorText>{formErrors?.eventType}</S.ErrorText>}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 일정
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <Input as="span">{event?.eventDate}</Input>
              ) : (
                <CustomDatePicker
                  date={formValues?.eventDate || null}
                  onChange={(value) => handleChange?.('eventDate', value)}
                  isError={!!formErrors?.eventDate || false}
                />
              )}
              {formErrors?.eventDate && <S.ErrorText>{formErrors?.eventDate}</S.ErrorText>}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 장소
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <Input as="span">{event?.address}</Input>
              ) : (
                <>
                  <Input
                    type="text"
                    placeholder="장소를 입력하세요."
                    readOnly
                    value={formValues?.address}
                    onClick={() => setIsModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsModalOpen(true);
                    }}
                    state={formErrors?.address ? 'error' : 'default'}
                  />
                  <AddressModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelectAddress={(selectedAddress) => handleChange?.('address', selectedAddress)}
                  />
                </>
              )}
              {formErrors?.address && <S.ErrorText>{formErrors?.address}</S.ErrorText>}
            </S.FieldGroup>
            {mode === 'read' ? (
              event &&
              event.participants > 0 && (
                <S.FieldGroup>
                  <S.Label>예상 인원</S.Label>
                  <Input as="span">{event?.participants}명</Input>
                </S.FieldGroup>
              )
            ) : (
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
        <S.ButtonArea>
          {mode === 'read' ? (
            <>
              <Button as={Link} to="/events" variant="secondary" fontWeight="semibold">
                이전
              </Button>
              <Button as={Link} to={`/events/${eventId}/update`} variant="primary" fontWeight="semibold">
                수정
              </Button>
              <Button onClick={handleDelete} variant="primary" fontWeight="semibold">
                삭제
              </Button>
              <Button as={Link} to={`/events/${eventId}/records/create`} variant="primary" fontWeight="semibold">
                입출금 내역 등록
              </Button>
              <Button as={Link} to={`/events/${eventId}/records`} variant="primary" fontWeight="semibold">
                입출금 내역 조회
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to={mode === 'create' ? '/events' : `/events/${eventId}`}
                variant="secondary"
                fontWeight="semibold"
              >
                이전
              </Button>
              <Button onClick={handleSubmit} variant="primary" fontWeight="semibold">
                저장
              </Button>
            </>
          )}
        </S.ButtonArea>
      </S.Card>
    </S.Main>
  );
};

export default EventForm;
