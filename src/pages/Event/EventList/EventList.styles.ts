import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
  align-items: center;
  min-height: calc(100vh - 16px);
`;

export const Title = styled.h2`
  margin-bottom: 35px;
  color: #000000;
  font-size: 48px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  margin-bottom: 70px;
  font-size: 20px;
`;

export const CardSection = styled.div`
  width: 100%;
  background-color: #e4f0fa;
  padding: 100px 0;
  margin-bottom: 100px;
`;

export const CardList = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 383px);
  justify-content: center;
  gap: 50px 60px;
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  height: 472px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background-color: #f1f3f7;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NoImage = styled.img``;

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

export const RecordLink = styled(Link)<{ variant?: 'create' | 'list' }>`
  padding: 25px 20px;
  border-radius: 10px;
  background-color: ${({ variant }) => (variant === 'create' ? '#e4f0fa' : '#ffffff')};

  &:hover {
    text-decoration: underline;
  }
`;

export const ContentSection = styled(Link)`
  display: block;
  padding: 20px;
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
    background-color: ${({ $status }) =>
      $status === '예정' ? '#fcce39' : status === '진행중' ? '#61f52c' : '#3959a5'};
  }
`;

export const CardTitle = styled.p`
  margin-bottom: 15px;
  font-size: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDate = styled.p`
  font-size: 24px;
  color: #9d9d9d;
`;

export const FetchingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

// Empty Styles

export const EmptyBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
  background-color: #e4f0fa;
`;

// Common Styles

export const BlueText = styled.span`
  color: #3959a5;
`;

export const BoldText = styled.span`
  font-weight: bold;
`;
