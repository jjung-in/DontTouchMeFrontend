import { uploadImage } from '@_api/image';
import { getGeocode } from '@_api/map';
import EventForm from '@_components/Event/EventForm/EventForm';
import { useCreateEvent } from '@_hooks/useEvents';
import { TCreateEventRequest, TFormErrors } from '@_types/events.type';
import { validateEventForm } from '@_utils/events';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './EventCreate.styles';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

const EventCreate = () => {
  const navigate = useNavigate();

  const memberId = 1;
  const { mutate: createEvent } = useCreateEvent(memberId);

  const [otherEventType, setOtherEventType] = useState<string>('');
  const [isTag, setIsTag] = useState<boolean>(false);
  const [isTarget, setIsTarget] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<TCreateEventRequest>({
    memberId: memberId,
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

  const handleChange = (key: keyof TCreateEventRequest, value: string | number | boolean | string[] | null) => {
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

    let imageUrl = '';
    try {
      if (thumbnailFile) {
        imageUrl = await uploadImage(thumbnailFile);
      }
    } catch {
      console.warn('이미지 업로드에 실패했습니다.');
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

    createEvent(
      {
        ...formValues,
        thumbnailUrl: imageUrl,
        latitude,
        longitude,
        eventType: formValues.eventType === '기타' ? otherEventType : formValues.eventType,
        tags: isTag ? formValues.tags : [],
        targets: isTarget ? formValues.targets : [],
        sendType: formValues.isSend ? formValues.sendType : null,
      },
      {
        onSuccess: () => {
          navigate('/events');
        },
      },
    );
  };

  return (
    <S.Main>
      <PageTitle title="이벤트 만들기" highlight="이벤트 만들기" subtitle="정보들을 입력해 이벤트를 생성합니다." />
      <EventForm
        mode="create"
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
    </S.Main>
  );
};

export default EventCreate;
