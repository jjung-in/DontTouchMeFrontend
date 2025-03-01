import useInput from '@_hooks/useInput';
import {
  ButtonGroup,
  DateInput,
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

const EventCreate = () => {
  const { value: thumbnail, error: thumbnailError, onChange: handleThumbnailChange } = useInput<FileList | null>(null);
  const { value: eventName, error: eventNameError, onChange: handleEventNameChange } = useInput<string>('');
  const { value: type, error: typeError, onChange: handleTypeChange } = useInput<string>('wedding');
  const { value: otherType, error: otherTypeError, onChange: handleOtherTypeChange } = useInput<string>('');
  const { value: date, error: dateError, onChange: handleDateChange } = useInput<string>('');
  const { value: location, error: locationError, onChange: handleLocationChange } = useInput<string>('');
  const { value: guests, error: guestsError, onChange: handleGuestsChange } = useInput<string | number>('');
  const { value: name, error: nameError, onChange: handleNameChange } = useInput<boolean>(false);
  const { value: tag, error: tagError, onChange: handleTagChange } = useInput<boolean>(false);
  const { value: photo, error: photoError, onChange: handlePhotoChange } = useInput<boolean>(false);
  const { value: target, error: targetError, onChange: handleTargetChange } = useInput<boolean>(false);
  const { value: card, error: cardError, onChange: handleCardChange } = useInput<boolean>(false);
  const { value: cardType, error: cardTypeError, onChange: handleCardTypeChange } = useInput<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <div>
        <Title>이벤트 만들기</Title>
        <ButtonGroup>
          <button type="button">이전</button>
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
            <TextInput type="text" name="name" value={eventName} onChange={handleEventNameChange} maxLength={100} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 유형</InputTitle>
            <RadioGroup>
              <label htmlFor="wedding">
                <RadioInput
                  type="radio"
                  name="type"
                  id="wedding"
                  value="wedding"
                  checked={type === 'wedding'}
                  onChange={handleTypeChange}
                />
                결혼식
              </label>
              <label htmlFor="funeral">
                <RadioInput
                  type="radio"
                  name="type"
                  id="funeral"
                  value="funeral"
                  checked={type === 'funeral'}
                  onChange={handleTypeChange}
                />
                장례식
              </label>
              <label htmlFor="other">
                <RadioInput
                  type="radio"
                  name="type"
                  id="other"
                  value="other"
                  checked={type === 'other'}
                  onChange={handleTypeChange}
                />
                기타
                {type === 'other' && (
                  <input type="text" name="otherTypeName" value={otherType} onChange={handleOtherTypeChange} />
                )}
              </label>
            </RadioGroup>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 일정</InputTitle>
            <DateInput type="date" name="date" value={date} onChange={handleDateChange} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>이벤트 장소</InputTitle>
            <TextInput type="text" name="location" value={location} onChange={handleLocationChange} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>예상 인원</InputTitle>
            <NumberInput type="number" name="guests" value={guests} onChange={handleGuestsChange} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>입출금 항목</InputTitle>
            <InputSubWrapper>
              <InputSubTitle>입출금 분류</InputSubTitle>
              <input type="checkbox" name="transactionCategory" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>입출금 내역명</InputSubTitle>
              <input type="checkbox" name="transactionName" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>금액</InputSubTitle>
              <input type="checkbox" name="amount" defaultChecked disabled />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>이름</InputSubTitle>
              <input type="checkbox" name="name" checked={name} onChange={handleNameChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>태그</InputSubTitle>
              <input type="checkbox" name="tag" checked={tag} onChange={handleTagChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>사진 첨부</InputSubTitle>
              <input type="checkbox" name="photoAttachment" checked={photo} onChange={handlePhotoChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>입금 대상</InputSubTitle>
              <input type="checkbox" name="depositTarget" checked={target} onChange={handleTargetChange} />
            </InputSubWrapper>
            <InputSubWrapper>
              <InputSubTitle>감사장</InputSubTitle>
              <input type="checkbox" name="thankYouCard" checked={card} onChange={handleCardChange} />
              <div>
                <input
                  type="radio"
                  name="thankYouCardType"
                  id="email"
                  value="email"
                  checked={cardType === 'email'}
                  onChange={handleCardTypeChange}
                  disabled={!card}
                />
                <label htmlFor="email">이메일</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="thankYouCardType"
                  id="sms"
                  value="sms"
                  checked={cardType === 'sms'}
                  onChange={handleCardTypeChange}
                  disabled={!card}
                />
                <label htmlFor="sms">문자</label>
              </div>
            </InputSubWrapper>
          </InputWrapper>
        </Form>
      </div>
    </MainContainer>
  );
};

export default EventCreate;
