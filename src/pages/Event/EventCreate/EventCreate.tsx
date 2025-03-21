import { getGeocode } from '@_api/map';
import AddressModal from '@_components/AddressModal/AddressModal';
import TagInput from '@_components/TagInput/TagInput';
import { useCreateEvent } from '@_hooks/useEvents';
import { TCreateEventRequest } from '@_types/events.type';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isImageFile } from '@_utils/image';
import { uploadImage } from '@_api/image';

const EventCreate = () => {
  const navigate = useNavigate();
  const { mutate: createEvent } = useCreateEvent();

  const memberId = 1;
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [otherEventType, setOtherEventType] = useState('');
  const [isTag, setIsTag] = useState(false);
  const [isTarget, setIsTarget] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<TCreateEventRequest>({
    memberId: memberId,
    thumbnailUrl: '',
    eventName: '',
    eventType: '',
    eventDate: '',
    address: '',
    latitude: 0,
    longitude: 0,
    participants: '',
    isType: true,
    isHistory: true,
    isPrice: true,
    isName: false,
    tags: tags,
    isImage: false,
    targets: targets,
    isSend: false,
    sendType: null,
    sendTypeValid: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (key: keyof TCreateEventRequest, value: string | number | boolean) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!isImageFile(selectedFile)) {
      alert('이미지 파일만 업로드 가능');
      e.target.value = '';
      return;
    }
    setThumbnail(selectedFile);
    setThumbnailPreview(URL.createObjectURL(selectedFile));
    e.target.value = '';
  };

  const handleThumbnailReset = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnail(null);
    setThumbnailPreview('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    // if (!validateEventForm(formValues)) return;

    let imageUrl = formValues.thumbnailUrl;
    if (thumbnail) {
      imageUrl = await uploadImage(thumbnail);
      if (!imageUrl) {
        console.error('이미지 업로드 실패');
        return;
      }
    }

    const { latitude, longitude } = await getGeocode(formValues.address);
    setFormValues((prev) => ({ ...prev, latitude, longitude }));

    createEvent(
      {
        ...formValues,
        thumbnailUrl: imageUrl,
        eventType: formValues.eventType === '기타' ? otherEventType : formValues.eventType,
        sendType: formValues.isSend ? formValues.sendType : null,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate('/events');
        },
        onError: (error) => {
          console.error('Error creating event:', error);
        },
      },
    );
  };

  return (
    <div>
      <hr />
      <div>
        <h2>이벤트 만들기</h2>
      </div>
      <hr />
      <div>
        <Link to="/events">목록</Link>
        &emsp;
        <button form="event">저장</button>
      </div>
      <hr />
      <div>
        <form id="event" onSubmit={handleSubmit}>
          <div>
            <span>썸네일</span>
            <input type="file" accept="image/*" onChange={handleThumbnailChange} />
            {thumbnailPreview && (
              <div>
                <img src={thumbnailPreview} alt="Thumbnail" style={{ width: 200 }} />
                <button type="button" onClick={handleThumbnailReset}>
                  취소
                </button>
              </div>
            )}
          </div>
          <div>
            <span>이벤트명</span>
            <input
              type="text"
              maxLength={100}
              value={formValues.eventName}
              onChange={(e) => handleChange('eventName', e.target.value)}
            />
          </div>
          <div>
            <span>유형</span>
            <label>
              <input
                type="radio"
                value="결혼식"
                checked={formValues.eventType === '결혼식'}
                onChange={() => handleChange('eventType', '결혼식')}
              />
              결혼식
            </label>
            <label>
              <input
                type="radio"
                value="장례식"
                checked={formValues.eventType === '장례식'}
                onChange={() => handleChange('eventType', '장례식')}
              />
              장례식
            </label>
            <label>
              <input
                type="radio"
                value="기타"
                checked={formValues.eventType === '기타'}
                onChange={() => handleChange('eventType', '기타')}
              />
              기타
            </label>
            {formValues.eventType === '기타' && (
              <input
                type="text"
                maxLength={10}
                value={otherEventType}
                onChange={(e) => setOtherEventType(e.target.value)}
              />
            )}
          </div>
          <div>
            <span>일정</span>
            <input
              type="date"
              value={formValues.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
            />
          </div>
          <div>
            <span>장소</span>
            <input type="text" readOnly value={formValues.address} onClick={() => setIsModalOpen(true)} />
            <AddressModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSelectAddress={(selectedAddress) => handleChange('address', selectedAddress)}
            />
          </div>
          <div>
            <span>인원</span>
            <input
              type="number"
              min={1}
              value={formValues.participants || ''}
              onChange={(e) => handleChange('participants', Number(e.target.value))}
            />
          </div>
          <br />
          <div>
            <span>입출금 분류</span>
            <input type="checkbox" defaultChecked disabled />
          </div>
          <div>
            <span>입출금 내역명</span>
            <input type="checkbox" defaultChecked disabled />
          </div>
          <div>
            <span>금액</span>
            <input type="checkbox" defaultChecked disabled />
          </div>
          <div>
            <span>이름</span>
            <input
              type="checkbox"
              checked={formValues.isName}
              onChange={(e) => handleChange('isName', e.target.checked)}
            />
          </div>
          <div>
            <span>태그</span>
            <input type="checkbox" checked={isTag} onChange={(e) => setIsTag(e.target.checked)} />
            {isTag && <TagInput tags={tags} setTags={setTags} />}
          </div>
          <div>
            <span>사진 첨부</span>
            <input
              type="checkbox"
              checked={formValues.isImage}
              onChange={(e) => handleChange('isImage', e.target.checked)}
            />
          </div>
          <div>
            <span>입금 대상</span>
            <input type="checkbox" checked={isTarget} onChange={(e) => setIsTarget(e.target.checked)} />
            {isTarget && <TagInput tags={targets} setTags={setTargets} />}
          </div>
          <div>
            <span>감사장</span>
            <input
              type="checkbox"
              checked={formValues.isSend}
              onChange={(e) => handleChange('isSend', e.target.checked)}
            />
            <label>
              <input
                type="radio"
                value="EMAIL"
                checked={formValues.sendType === 'EMAIL'}
                onChange={() => handleChange('sendType', 'EMAIL')}
                disabled={!formValues.isSend}
              />
              이메일
            </label>
            <label>
              <input
                type="radio"
                value="PHONE"
                checked={formValues.sendType === 'PHONE'}
                onChange={() => handleChange('sendType', 'PHONE')}
                disabled={!formValues.isSend}
              />
              문자
            </label>
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default EventCreate;
