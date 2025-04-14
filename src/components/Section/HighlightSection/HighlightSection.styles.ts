import { TitleStyle } from '@_styles/common';
import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 250px 50px;
`;

export const Abatar = styled.div`
  position: relative;

  img {
    width: 500px;
  }
`;

export const BadgeTop = styled.div`
  position: absolute;
  top: -70px;
  right: -70px;
`;

export const BadgeBottom = styled.div`
  position: absolute;
  top: 80px;
  right: -150px;
`;

export const Badge = styled.div`
  width: 200px;
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.2;

  span {
    color: #1e88e5;
    font-size: 26px;
    font-weight: 700;
  }
`;

export const Info = styled.div`
  text-align: center;
`;

export const Title = styled.p`
  ${TitleStyle}
  line-height: 1.5;
  text-align: left;
  background-color: #ffffffcc;
`;

export const SignUpBlock = styled.div`
  margin-top: 100px;
`;

export const SocialButtonGroup = styled.div`
  display: inline-flex;
  gap: 30px;
  margin-bottom: 20px;
`;

export const SocialButton = styled.button``;

export const SignUpText = styled.p`
  color: #9d9d9d;
  cursor: default;
`;
