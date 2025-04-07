import { uploadImage } from '@_api/image';
import { getGeocode } from '@_api/map';
import * as S from './EventUpdate.styles';
import { useEventDetail, useUpdateEvent } from '@_hooks/useEvents';
import { TUpdateEventRequest } from '@_types/events.type';
import { isImageFile } from '@_utils/image';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '@_components/EventForm/EventForm';
import Spinner from '@_components/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';

const EventUpdate = () => {
  const navigate = useNavigate();

  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: updateEvent } = useUpdateEvent(eventId);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [otherEventType, setOtherEventType] = useState<string>('');
  const [isTag, setIsTag] = useState<boolean>(false);
  const [isTarget, setIsTarget] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<TUpdateEventRequest>({
    thumbnailUrl: '',
    eventName: '',
    eventType: '결혼식',
    eventDate: '',
    address: '',
    latitude: 0,
    longitude: 0,
    participants: '',
    isType: true,
    isHistory: true,
    isPrice: true,
    isName: false,
    tags: [],
    isImage: false,
    targets: [],
    isSend: false,
    sendType: 'EMAIL',
    sendTypeValid: false,
  });

  useEffect(() => {
    if (data) {
      const shouldName = data.eventInfoItems.includes('이름');
      const shouldTag = data.eventInfoItems.includes('태그');
      const shouldImage = data.eventInfoItems.includes('사진 첨부');
      const shouldTarget = data.eventInfoItems.includes('입금대상');
      const shouldSend = data.eventInfoItems.includes('감사장');

      setFormValues((prev) => ({
        ...prev,
        thumbnailUrl: data.thumbnailUrl || '',
        eventName: data.eventName || '',
        eventType: data.eventType === '결혼식' || data.eventType === '장례식' ? data.eventType : '기타',
        eventDate: data.eventDate || '',
        address: data.address || '',
        participants: data.participants || '',
        isName: shouldName,
        tags: shouldTag ? data.tags : [],
        isImage: shouldImage,
        targets: shouldTarget ? data.targets : [],
        isSend: shouldSend,
        sendType: data.sendType || null,
      }));

      if (data.thumbnailUrl) {
        setThumbnailPreview(data.thumbnailUrl);
      }
      if (data.eventType !== '결혼식' && data.eventType !== '장례식') {
        setOtherEventType(data.eventType);
      }
      setIsTag(shouldTag);
      setIsTarget(shouldTarget);
    }
  }, [data]);

  const handleChange = (key: keyof TUpdateEventRequest, value: string | number | boolean | string[] | null) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!isImageFile(selectedFile)) {
      alert('이미지 형식의 파일만 업로드할 수 있습니다.');
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
    handleChange('thumbnailUrl', '');
  };

  const handleSubmit = async () => {
    // 유효성 검사
    // if (!validateEventForm(formValues)) return;

    let imageUrl = formValues.thumbnailUrl;
    if (thumbnail) {
      imageUrl = await uploadImage(thumbnail);
      if (!imageUrl) {
        console.warn('이미지 업로드에 실패했습니다.');
      }
    }

    let latitude = 0;
    let longitude = 0;
    try {
      const geo = await getGeocode(formValues.address);
      latitude = geo.latitude;
      longitude = geo.longitude;
    } catch {
      console.warn('주소 변환에 실패했습니다.');
    }

    updateEvent(
      {
        eventId,
        eventData: {
          ...formValues,
          thumbnailUrl: imageUrl,
          latitude,
          longitude,
          eventType: formValues.eventType === '기타' ? otherEventType : formValues.eventType,
          tags: isTag ? formValues.tags : [],
          targets: isTarget ? formValues.targets : [],
          sendType: formValues.isSend ? formValues.sendType : null,
        },
      },
      {
        onSuccess: () => {
          navigate(`/events/${eventId}`);
        },
      },
    );
  };

  return (
    <>
      {isFetching ? (
        <S.Main>
          <Spinner />
        </S.Main>
      ) : data ? (
        <EventForm
          mode="update"
          formValues={formValues}
          thumbnailPreview={thumbnailPreview}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleThumbnailChange={handleThumbnailChange}
          handleThumbnailReset={handleThumbnailReset}
          otherEventType={otherEventType}
          setOtherEventType={setOtherEventType}
          isTag={isTag}
          setIsTag={setIsTag}
          isTarget={isTarget}
          setIsTarget={setIsTarget}
        />
      ) : (
        <S.Main>
          <EmptyState />
        </S.Main>
      )}
    </>
  );
};

export default EventUpdate;
