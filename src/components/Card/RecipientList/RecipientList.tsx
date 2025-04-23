import Button from '@_components/Common/Button/Button';
import * as S from './RecipientList.styles';
import { TRecipientWithId } from '@_types/cards.type';

interface Props {
  recipients: TRecipientWithId[];
  selectedRecipients: TRecipientWithId[];
  isAllSelected: boolean;
  onToggle: (recipient: TRecipientWithId, checked: boolean) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const RecipientList = ({
  recipients,
  selectedRecipients,
  isAllSelected,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: Props) => {
  return (
    <S.Container>
      <S.Title>발송 대상</S.Title>
      <S.RecipientBox $isEmpty={!(recipients && recipients.length > 0)}>
        {recipients && recipients.length > 0 ? (
          <>
            <S.RecipientList>
              {recipients.map((recipient) => {
                const isChecked = selectedRecipients.some((r) => r.id === recipient.id);
                return (
                  <S.RecipientItem key={recipient.id} $disabled={!recipient.name || !recipient.contact}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (!recipient.name || !recipient.contact) {
                          alert(
                            '이름과 연락처가 모두 입력된 대상만 선택할 수 있습니다.\n이전 페이지에서 입력해주세요.',
                          );
                          return;
                        }
                        onToggle(recipient, e.target.checked);
                      }}
                    />
                    {recipient.name || '이름X'} | {recipient.contact || "연락처X"}
                  </S.RecipientItem>
                );
              })}
            </S.RecipientList>
            <S.ButtonGroup>
              {isAllSelected ? (
                <Button onClick={onDeselectAll}>전체 해제</Button>
              ) : (
                <Button onClick={onSelectAll}>전체 선택</Button>
              )}
            </S.ButtonGroup>
          </>
        ) : (
          <span>발송 대상이 없습니다.</span>
        )}
      </S.RecipientBox>
    </S.Container>
  );
};

export default RecipientList;
