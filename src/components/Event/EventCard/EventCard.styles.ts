import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
`;

export const ImageArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 210px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.plus.image};
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export const ContentArea = styled.div`
  display: block;
  padding: 20px;
`;

export const CardTitle = styled.p`
  padding-bottom: 15px;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDate = styled.p`
  color: ${({ theme }) => theme.color.text.gray};
  font-size: ${({ theme }) => theme.fontSize['lg']};
`;

export const StatusBadge = styled.span<{ $status: '예정' | '진행중' | '완료' }>`
  display: inline-block;
  position: relative;
  margin-bottom: 15px;
  padding: 10px 40px 10px 15px;
  border-radius: 15px;
  box-shadow: inset 1px 1px 9px 1px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;

  &::before {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme, $status }) =>
      $status === '예정'
        ? theme.color.plus.yellow
        : $status === '진행중'
          ? theme.color.plus.green
          : theme.color.plus.blue};
  }
`;
