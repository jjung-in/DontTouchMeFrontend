import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 250px 50px;
  background-image: url('/wave-divider.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffffff;
`;

export const Title = styled.p`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.5;
`;

export const HighlightText = styled.span`
  color: #3959a5;
`;

export const FloatingGroup = styled.div`
  position: relative;
  width: 430px;
  height: 400px;
  flex-shrink: 0;
`;

export const FloatingImage = styled.img<{
  $top: string;
  $left: string;
  $width?: string;
  $height?: string;
}>`
  position: absolute;
  width: ${({ $width }) => $width || '200px'};
  height: 200px;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
`;
