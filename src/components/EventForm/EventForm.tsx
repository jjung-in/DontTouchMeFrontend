import { TCreateEventRequest, TEventDetailResponse } from '@_types/events.type';
import { useParams } from 'react-router-dom';
import * as S from './EventForm.styles';
import noimage from '@_assets/images/noimage.png';
import required from '@_assets/images/required.png';
import { useState } from 'react';
import AddressModal from '@_components/AddressModal/AddressModal';
import CustomDatePicker from '@_components/CustomDatePicker/CustomDatePicker';
import Switch from '@_components/Switch/Switch';
import TagInput from '@_components/TagInput/TagInput';

interface Props {
  mode: 'create' | 'update' | 'read';
  event?: TEventDetailResponse;
  formValues?: TCreateEventRequest;
  thumbnailPreview?: string;
  handleSubmit?: () => void;
  handleDelete?: () => void;
  handleChange?: (key: keyof TCreateEventRequest, value: string | number | boolean | string[] | null) => void;
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
        <>
          <S.Title>이벤트 만들기</S.Title>
          <S.SubTitle>정보들을 입력해 이벤트를 생성합니다.</S.SubTitle>
        </>
      ) : (
        <>
          <S.Title>이벤트 상세 정보</S.Title>
          <S.SubTitle>등록된 이벤트의 상세 정보를 확인하고, 수정합니다.</S.SubTitle>
        </>
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
                  <S.Button
                    onClick={handleThumbnailReset}
                    $fontWeight="normal"
                    $textColor="#ffffff"
                    $bgColor="#3959a5"
                    $borderColor="#3959a5"
                  >
                    취소
                  </S.Button>
                ) : (
                  <label htmlFor="thumbnail">
                    <S.FileButton $fontWeight="normal" $borderColor="#3959a5">
                      사진 등록하기
                    </S.FileButton>
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
                <S.Text>{event?.eventName}</S.Text>
              ) : (
                <S.Input
                  type="text"
                  maxLength={100}
                  placeholder="이벤트명을 입력하세요."
                  value={formValues?.eventName}
                  onChange={(e) => handleChange?.('eventName', e.target.value)}
                />
              )}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 유형
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <S.Text>{event?.eventType}</S.Text>
              ) : (
                <>
                  <S.Select value={formValues?.eventType} onChange={(e) => handleChange?.('eventType', e.target.value)}>
                    <option value="결혼식">결혼식</option>
                    <option value="장례식">장례식</option>
                    <option value="기타">기타</option>
                  </S.Select>
                  {formValues?.eventType === '기타' && (
                    <S.Input
                      type="text"
                      maxLength={10}
                      placeholder="ex) 모임"
                      value={otherEventType}
                      onChange={(e) => setOtherEventType?.(e.target.value)}
                    />
                  )}
                </>
              )}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 일정
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <S.Text>{event?.eventDate}</S.Text>
              ) : (
                <CustomDatePicker
                  date={formValues?.eventDate || null}
                  onChange={(value) => handleChange?.('eventDate', value)}
                />
              )}
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label>
                이벤트 장소
                <img src={required} alt="필수 입력" />
              </S.Label>
              {mode === 'read' ? (
                <S.Text>{event?.address}</S.Text>
              ) : (
                <>
                  <S.Input
                    type="text"
                    placeholder="장소를 입력하세요."
                    readOnly
                    value={formValues?.address}
                    onClick={() => setIsModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setIsModalOpen(true);
                    }}
                  />
                  <AddressModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSelectAddress={(selectedAddress) => handleChange?.('address', selectedAddress)}
                  />
                </>
              )}
            </S.FieldGroup>
            {mode === 'read' ? (
              event &&
              event.participants > 0 && (
                <S.FieldGroup>
                  <S.Label>예상 인원</S.Label>
                  <S.Text>{event?.participants}명</S.Text>
                </S.FieldGroup>
              )
            ) : (
              <S.FieldGroup>
                <S.Label>예상 인원</S.Label>
                <S.NumberInput>
                  <input
                    type="number"
                    min={1}
                    value={formValues?.participants || ''}
                    onChange={(e) => handleChange?.('participants', Number(e.target.value))}
                  />
                </S.NumberInput>
              </S.FieldGroup>
            )}
            <S.FieldGroup>
              <S.Label>입출금 항목</S.Label>
              {mode === 'read' ? (
                <S.TextBox>{event?.eventInfoItems.map((item, index) => <span key={index}>{item}</span>)}</S.TextBox>
              ) : (
                <S.DetailBox>
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
                      <TagInput
                        tags={formValues?.tags || []}
                        setTags={(newTags) =>
                          handleChange?.(
                            'tags',
                            typeof newTags === 'function' ? newTags(formValues?.tags || []) : newTags,
                          )
                        }
                      />
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
                      <TagInput
                        tags={formValues?.targets || []}
                        setTags={(newTargets) =>
                          handleChange?.(
                            'targets',
                            typeof newTargets === 'function' ? newTargets(formValues?.targets || []) : newTargets,
                          )
                        }
                      />
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
                      <S.DetailSelect
                        value={formValues?.sendType || undefined}
                        onChange={(e) => handleChange?.('sendType', e.target.value)}
                      >
                        <option value="EMAIL">이메일</option>
                        <option value="PHONE">문자</option>
                      </S.DetailSelect>
                    )}
                  </S.DetailGroup>
                </S.DetailBox>
              )}
            </S.FieldGroup>
          </S.FieldSection>
        </S.FormArea>
        <S.ButtonArea>
          {mode === 'create' && (
            <>
              <S.LinkButton to="/events" $textColor="#3959a5" $borderColor="#3959a5">
                이전
              </S.LinkButton>
              <S.Button onClick={handleSubmit} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
                저장
              </S.Button>
            </>
          )}
          {mode === 'read' && (
            <>
              <S.LinkButton to="/events" $textColor="#3959a5" $borderColor="#3959a5">
                이전
              </S.LinkButton>
              <S.LinkButton
                to={`/events/${eventId}/update`}
                $textColor="#ffffff"
                $borderColor="#3959a5"
                $bgColor="#3959a5"
              >
                수정
              </S.LinkButton>
              <S.Button onClick={handleDelete} $textColor="#ffffff" $borderColor="#3959a5" $bgColor="#3959a5">
                삭제
              </S.Button>
              <S.LinkButton
                to={`/events/${eventId}/records/create`}
                $textColor="#ffffff"
                $borderColor="#3959a5"
                $bgColor="#3959a5"
              >
                입출금 내역 등록
              </S.LinkButton>
              <S.LinkButton
                to={`/events/${eventId}/records`}
                $textColor="#ffffff"
                $borderColor="#3959a5"
                $bgColor="#3959a5"
              >
                입출금 내역 조회
              </S.LinkButton>
            </>
          )}
        </S.ButtonArea>
      </S.Card>
    </S.Main>
  );
};

export default EventForm;
