import styled from 'styled-components';

export const TermsContent = styled.div`
  overflow: auto;
  height: 100%;
`;

export const TextContainer = styled.div`
  padding-right: 10px;
  margin-bottom: 1.5rem;
  text-align: left;
  line-height: 1.3;
`;

export const Title = styled.h1`
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSize['xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const Caption = styled.p<{ fontWeight?: 'bold' | 'normal'; color?: 'black' | 'red' }>`
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color, theme }) => (color ? theme.color.text[color] : theme.color.text.black)};
  margin-bottom: 0.3rem;
`;

export const UnorderedTermsList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`;

export const OrderedTermsList = styled.ol`
  list-style-type: decimal;
  padding-left: 1.5rem;
`;

export const TermsItem = styled.li<{ fontWeight?: 'bold' | 'normal' }>`
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ theme }) => theme.color.text.black};
  margin-bottom: 0.3rem;
`;
