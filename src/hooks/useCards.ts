import { getSendRecipients, sendEmail } from '@_api/cards';
import { TRecipientList, TRecipientWithId } from '@_types/cards.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const useGetSendRecipients = (eventId: number) => {
  return useQuery<TRecipientList>({
    queryKey: ['recipients', eventId],
    queryFn: () => getSendRecipients(eventId),
  });
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
  });
};

export const useRecipientSelection = (recipients: TRecipientWithId[]) => {
  const [selectedRecipients, setSelectedRecipients] = useState<TRecipientWithId[]>([]);

  const validRecipients = useMemo(() => recipients.filter((r) => r.name && r.contact), [recipients]);

  const isAllSelected = useMemo(() => {
    return validRecipients.length > 0 && selectedRecipients.length === validRecipients.length;
  }, [validRecipients, selectedRecipients]);

  const handleToggleRecipient = (recipient: TRecipientWithId, checked: boolean) => {
    setSelectedRecipients((prev) => (checked ? [...prev, recipient] : prev.filter((r) => r.id !== recipient.id)));
  };

  const handleSelectAll = () => {
    setSelectedRecipients(validRecipients);
  };

  const handleDeselectAll = () => {
    setSelectedRecipients([]);
  };

  return {
    selectedRecipients,
    isAllSelected,
    handleToggleRecipient,
    handleSelectAll,
    handleDeselectAll,
  };
};
