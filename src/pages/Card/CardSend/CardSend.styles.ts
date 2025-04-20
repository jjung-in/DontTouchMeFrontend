import { MainStyle } from '@_styles/common';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
  gap: ${(props) => (props.$isEmpty ? '30px' : '0')};
  background-color: ${({ theme }) => theme.color.primary[200]};
`;

export const EventInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
  height: 230px;
  background-color: ${({ theme }) => theme.color.primary[50]};
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.plus.image};
  overflow: hidden;
`;

export const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EventContent = styled.div``;

export const StatusBadge = styled.span<{ $status: '예정' | '진행중' | '완료' }>`
  display: inline-block;
  position: relative;
  margin-bottom: 20px;
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

export const EventTitle = styled.p`
  padding-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EventDate = styled.p`
  color: ${({ theme }) => theme.color.text.gray};
  font-size: ${({ theme }) => theme.fontSize['lg']};
`;

export const SendSection = styled.div`
  display: flex;
  gap: 100px;
  width: 100%;
  padding: 100px 100px 0;
  text-align: center;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
`;

export const EmptyBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 100%;
`;
