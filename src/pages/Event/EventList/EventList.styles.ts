import { MainStyle } from '@_styles/layout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Main = styled.main<{ $isEmpty?: boolean }>`
  ${MainStyle}
`;

export const CardSection = styled.div`
  width: 100%;
  background-color: #e4f0fa;
  padding: 100px 0;
`;

export const CardList = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 324px);
  justify-content: center;
  gap: 50px 60px;
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
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
  height: 210px;
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
    background-color: ${({ theme, $status }) =>
      $status === '예정'
        ? theme.color.plus.yellow
        : $status === '진행중'
          ? theme.color.plus.green
          : theme.color.plus.blue};
  }
`;

export const CardTitle = styled.p`
  padding-bottom: 15px;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardDate = styled.p`
  font-size: 18px;
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

export const BoldText = styled.span`
  font-weight: bold;
`;
