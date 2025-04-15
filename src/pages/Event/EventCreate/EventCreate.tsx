import { uploadImage } from '@_api/image';
import { getGeocode } from '@_api/map';
import EventForm from '@_components/Event/EventForm/EventForm';
import { useCreateEvent } from '@_hooks/useEvents';
import { TEventFormValues } from '@_types/events.type';
import { useNavigate } from 'react-router-dom';
import * as S from './EventCreate.styles';
import PageTitle from '@_components/Common/PageTitle/PageTitle';

const EVENT_CREATE_TITLE = {
  title: '이벤트 만들기',
  highlight: '이벤트 만들기',
  subtitle: '정보들을 입력해 이벤트를 생성합니다.',
};

const EventCreate = () => {
  const navigate = useNavigate();
  const memberId = 1;
  const { mutate: createEvent } = useCreateEvent(memberId);

  const handleSubmit = async (formValues: TEventFormValues, thumbnailFile: File | null) => {
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
        memberId,
        thumbnailUrl: imageUrl,
        eventName: formValues.eventName,
        eventType: formValues.eventType === '기타' ? formValues.otherEventType : formValues.eventType,
        eventDate: formValues.eventDate,
        address: formValues.address,
        latitude,
        longitude,
        participants: formValues.participants,
        isType: true,
        isHistory: true,
        isPrice: true,
        isName: formValues.isName,
        tags: formValues.isTag ? formValues.tags : null,
        isImage: formValues.isImage,
        targets: formValues.isTarget ? formValues.targets : null,
        isSend: formValues.isSend,
        sendType: formValues.isSend ? formValues.sendType : null,
        sendTypeValid: false,
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
      <PageTitle {...EVENT_CREATE_TITLE} />
      <EventForm mode="create" onSubmit={handleSubmit} />
    </S.Main>
  );
};

export default EventCreate;
