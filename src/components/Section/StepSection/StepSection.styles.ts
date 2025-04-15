import { TitleStyle } from '@_styles/common';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Section = styled.section`
  width: 100%;
  padding: 200px 0;
  text-align: center;
  background-color: #ffffff;
`;

export const Title = styled.p`
  ${TitleStyle}
`;

export const Steps = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
  margin-top: 180px;
  margin-bottom: 180px;

  @media (max-width: 1440px) {
    gap: 110px;
  }
`;

export const Step = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 350px;
`;

export const StepImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background: #e4f0fa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  img {
    width: 100px;
    height: 100px;
  }
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StepLabel = styled.p`
  color: #1e88e5;
  font-size: 28px;
`;

export const StepTitle = styled.p`
  font-size: 36px;
  font-weight: 600;
`;

export const StepDesc = styled.p`
  color: #9d9d9d;
  line-height: 1.3;
`;

export const CurveImg = styled.div`
  position: absolute;
  top: 0;
  left: 285px;

  img {
    width: 330px;
    height: 150px;
    margin-top: 25px;
    object-fit: fill;
  }

  @media (max-width: 1440px) {
    left: 285px;

    img {
      width: 245px;
      margin-top: 25px;
    }
  }
`;

const pulse = keyframes`
  0%   { transform: scale(1); }
  20%  { transform: scale(1.1); }
  40% { transform: scale(1); }
  100% { transform: scale(1); }
`;

export const LinkButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 25px 120px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.color.primary[500]};
  box-shadow: inset 6px 6px 50px #5db3ff;

  img {
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;
