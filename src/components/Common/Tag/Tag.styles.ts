import styled from 'styled-components';

export const TagContainer = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.color.primary[200]};
  border-radius: 20px;
  color: ${({ theme }) => theme.color.text.black};
  cursor: default;
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  margin-left: 8px;

  img {
    width: 10px;
    height: 10px;
  }
`;
