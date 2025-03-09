import useInput from '@_hooks/useInput';
import {
  ButtonGroup,
  DateInput,
  ErrorText,
  FileInput,
  Form,
  InputSubTitle,
  InputSubWrapper,
  InputTitle,
  InputWrapper,
  MainContainer,
  NumberInput,
  RadioGroup,
  RadioInput,
  TextInput,
  Title,
} from './EventCreate.styles';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { nonEmptyDateValidator, nonEmptyStringValidator, nonNegativeIntegerValidator } from '@_utils/validator';
import { useCreateEvent } from '@_hooks/useEvents';
import { TCreateEvent } from '@_types/events.type';

const EventCreate = () => {
  const navigate = useNavigate();
  const { mutate: createEvent } = useCreateEvent();

  const memberId = 0;
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const {
    value: eventName,
    error: eventNameError,
    onChange: handleEventNameChange,
  } = useInput<string>('', nonEmptyStringValidator);
  const { value: eventType, onChange: handleEventTypeChange } = useInput<string>('wedding');
  const {
    value: otherEventType,
    error: otherEventTypeError,
    onChange: handleOtherEventTypeChange,
  } = useInput<string>('', nonEmptyStringValidator);
  const {
    value: eventDate,
    error: eventDateError,
    onChange: handleEventDateChange,
  } = useInput<string>('', nonEmptyDateValidator);
  const {
    value: address,
    error: addressError,
    onChange: handleAddressChange,
  } = useInput<string>('', nonEmptyStringValidator);
  const latitude = 0;
  const longitude = 0;
  const {
    value: participants,
    error: participantsError,
    onChange: handleParticipantsChange,
  } = useInput<string | number>('', nonNegativeIntegerValidator);
  const isType = true;
  const isHistory = true;
  const isPrice = true;
  const { value: isName, onChange: handleIsNameChange } = useInput<boolean>(false);
  const { value: isTag, onChange: handleIsTagChange } = useInput<boolean>(false);
  const tags = [];
  const { value: isImage, onChange: handleIsImageChange } = useInput<boolean>(false);
  const { value: isTarget, onChange: handleIsTargetChange } = useInput<boolean>(false);
  const targets = [];
  const { value: isSend, onChange: handleIsSendChange } = useInput<boolean>(false);
  const { value: sendType, onChange: handleSendTypeChange } = useInput<TCreateEvent['sendType']>(null);
  const sendTypeValid = false;

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setThumbnailUrl(previewUrl);
      setThumbnail(selectedFile);
    } else {
      setThumbnail(null);
      setThumbnailUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*
    const eventData: TCreateEvent = {
      memberId,
      thumbnailUrl,
      eventName,
      eventType,
      eventDate,
      address,
      latitude,
      longitude,
      participants: participants ? Number(participants) : null,
      isType,
      isHistory,
      isPrice,
      isName,
      tags,
      isImage: false,
      targets,
      isSend,
      sendType,
      sendTypeValid,
    };*/

    const eventData: TCreateEvent = {
      memberId: 0,
      thumbnailUrl: '',
      eventName: '테스트',
      eventType: '결혼식',
      eventDate: '2025-03-10',
      address: '서울시 강남구',
      latitude: 0,
      longitude: 0,
      participants: null,
      isType,
      isHistory,
      isPrice,
      isName,
      tags,
      isImage: false,
      targets,
      isSend,
      sendType,
      sendTypeValid,
    };

    createEvent(eventData, {
      onSuccess: () => {
        navigate('/events');
      },
      onError: (error) => {
        console.error('Error createing event:', error);
      },
    });
  };

  return (
    <MainContainer>
      <div>
        <Title>이벤트 만들기</Title>
      </div>
      <div>
        <ButtonGroup>
          <Link to="/events">이전</Link>
          <button type="submit" form="eventForm">
            저장
          </button>
        </ButtonGroup>
      </div>
      <div>
        <Form id="eventForm" onSubmit={handleSubmit}>
          <InputWrapper>
            <InputTitle>썸네일</InputTitle>
            <FileInput type="file" name="thumbnail" onChange={handleThumbnailChange} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트명</InputTitle>
            <TextInput
              type="text"
              name="eventName"
              value={eventName}
              onChange={handleEventNameChange}
              maxLength={100}
            />
            {eventNameError && <ErrorText>{eventNameError}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 유형</InputTitle>
            <RadioGroup>
              <label htmlFor="wedding">
                <RadioInput
                  type="radio"
                  name="eventType"
                  id="wedding"
                  value="wedding"
                  checked={eventType === 'wedding'}
                  onChange={handleEventTypeChange}
                />
                결혼식
              </label>
              <label htmlFor="funeral">
                <RadioInput
                  type="radio"
                  name="eventType"
                  id="funeral"
                  value="funeral"
                  checked={eventType === 'funeral'}
                  onChange={handleEventTypeChange}
                />
                장례식
              </label>
              <label htmlFor="other">
                <RadioInput
                  type="radio"
                  name="eventType"
                  id="other"
                  value="other"
                  checked={eventType === 'other'}
                  onChange={handleEventTypeChange}
                />
                기타
                {eventType === 'other' && (
                  <>
                    <input
                      type="text"
                      name="otherEventType"
                      value={otherEventType}
                      onChange={handleOtherEventTypeChange}
                      maxLength={10}
                    />
                    {otherEventTypeError && <ErrorText>{otherEventTypeError}</ErrorText>}
                  </>
                )}
              </label>
            </RadioGroup>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 일정</InputTitle>
            <DateInput type="eventDate" name="eventDate" value={eventDate} onChange={handleEventDateChange} />
            {eventDateError && <ErrorText>{eventDateError}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 장소</InputTitle>
            <TextInput type="text" name="address" value={address} onChange={handleAddressChange} />
            <ErrorText>{addressError}</ErrorText>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>예상 인원</InputTitle>
            <NumberInput
              type="number"
              name="participants"
              value={participants}
              onChange={handleParticipantsChange}
              min={0}
            />
            {participantsError && <ErrorText>{participantsError}</ErrorText>}
          </InputWrapper>
          <InputWrapper>
            <InputTitle>입출금 항목</InputTitle>
            <InputSubWrapper>
              <InputSubTitle>입출금 분류</InputSubTitle>
              <input type="checkbox" name="isType" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>입출금 내역명</InputSubTitle>
              <input type="checkbox" name="isHistory" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>금액</InputSubTitle>
              <input type="checkbox" name="isPrice" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>이름</InputSubTitle>
              <input type="checkbox" name="isName" checked={isName} onChange={handleIsNameChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>태그</InputSubTitle>
              <input type="checkbox" name="isTag" checked={isTag} onChange={handleIsTagChange} />
              {isTag && <input type="text" name="tags" />}
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>사진 첨부</InputSubTitle>
              <input type="checkbox" name="isImageAttachment" checked={isImage} onChange={handleIsImageChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>입금 대상</InputSubTitle>
              <input type="checkbox" name="depositTarget" checked={isTarget} onChange={handleIsTargetChange} />
              {isTarget && <input type="text" name="targets" />}
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>감사장</InputSubTitle>
              <input type="checkbox" name="isSend" checked={isSend} onChange={handleIsSendChange} />
              <div>
                <input
                  type="radio"
                  name="sendType"
                  id="EMAIL"
                  value="EMAIL"
                  checked={sendType === 'EMAIL'}
                  onChange={handleSendTypeChange}
                  disabled={!isSend}
                />
                <label htmlFor="EMAIL">이메일</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sendType"
                  id="PHONE"
                  value="PHONE"
                  checked={sendType === 'PHONE'}
                  onChange={handleSendTypeChange}
                  disabled={!isSend}
                />
                <label htmlFor="PHONE">문자</label>
              </div>
            </InputSubWrapper>
          </InputWrapper>
        </Form>
      </div>
    </MainContainer>
  );
};

export default EventCreate;
