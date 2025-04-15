import { uploadImage } from '@_api/image';
import { getGeocode } from '@_api/map';
import * as S from './EventUpdate.styles';
import { useEventDetail, useUpdateEvent } from '@_hooks/useEvents';
import { TFormErrors, TUpdateEventRequest } from '@_types/events.type';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from '@_components/Event/EventForm/EventForm';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import { validateEventForm } from '@_utils/events';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

const EventUpdate = () => {
  const navigate = useNavigate();

  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: updateEvent } = useUpdateEvent(eventId);

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
  const [formErrors, setFormErrors] = useState<TFormErrors>({});

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

      if (data.eventType !== '결혼식' && data.eventType !== '장례식') {
        setOtherEventType(data.eventType);
      }
      setIsTag(shouldTag);
      setIsTarget(shouldTarget);
    }
  }, [data]);

  const handleChange = (key: keyof TUpdateEventRequest, value: string | number | boolean | string[] | null) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prevErrors) => {
      if (!prevErrors[key]) return prevErrors;
      const { [key]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleSubmit = async (thumbnailFile: File | null) => {
    const errors = validateEventForm(formValues, otherEventType, isTag, isTarget);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    let imageUrl = formValues.thumbnailUrl;
    if (thumbnailFile) {
      imageUrl = await uploadImage(thumbnailFile);
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
          tags: isTag ? formValues.tags : null,
          targets: isTarget ? formValues.targets : null,
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
    <S.Main $isEmpty={isFetching || !data}>
      {isFetching ? (
        <Spinner />
      ) : data ? (
        <>
          <PageTitle
            title="이벤트 상세 정보"
            highlight="이벤트 상세 정보"
            subtitle="등록된 이벤트의 상세 정보를 확인하고, 수정합니다."
          />
          <EventForm
            mode="update"
            formValues={formValues}
            formErrors={formErrors}
            onSubmit={handleSubmit}
            handleChange={handleChange}
            otherEventType={otherEventType}
            setOtherEventType={setOtherEventType}
            isTag={isTag}
            setIsTag={setIsTag}
            isTarget={isTarget}
            setIsTarget={setIsTarget}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </S.Main>
  );
};

export default EventUpdate;
