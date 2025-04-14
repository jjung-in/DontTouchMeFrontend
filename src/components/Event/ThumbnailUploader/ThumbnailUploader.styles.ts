import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 250px;
`;

export const ThumbnailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background-color: #f1f3f7;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
