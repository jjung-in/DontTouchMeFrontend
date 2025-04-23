import { uploadImage } from '@_api/image';
import { getGeocode } from '@_api/map';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import Spinner from '@_components/Common/Spinner/Spinner';
import EmptyState from '@_components/EmptyState/EmptyState';
import EventForm from '@_components/Event/EventForm/EventForm';
import { useEventDetail, useUpdateEvent } from '@_hooks/useEvents';
import { useToastStore } from '@_store/toastStore';
import { TEventFormValues } from '@_types/events.type';
import { useNavigate, useParams } from 'react-router-dom';
import * as S from './EventUpdate.styles';

const EVENT_UPDATE_TITLE = {
  title: '이벤트 상세 정보',
  highlight: '이벤트 상세 정보',
  subtitle: '등록된 이벤트의 상세 정보를 확인하고, 수정합니다.',
};

const EventUpdate = () => {
  const navigate = useNavigate();
  const eventId = Number(useParams().eventId);
  const { data, isFetching } = useEventDetail(eventId);
  const { mutate: updateEvent } = useUpdateEvent(eventId);

  const handleSubmit = async (formValues: TEventFormValues, thumbnailFile: File | null) => {
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
      },
      {
        onSuccess: () => {
          navigate(`/events/${eventId}`);
          useToastStore.getState().showToast('이벤트 정보가 수정되었습니다.');
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
          <PageTitle {...EVENT_UPDATE_TITLE} />
          <EventForm mode="update" event={data} onSubmit={handleSubmit} />
        </>
      ) : (
        <EmptyBoxStyle>
          <EmptyState />
          <BackButton />
        </EmptyBoxStyle>
      )}
    </S.Main>
  );
};

export default EventUpdate;
