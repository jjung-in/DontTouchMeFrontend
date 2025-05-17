import uploadIcon from '@_assets/icons/download.png';
import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;
  background-color: #fff;
  background-image: url(${uploadIcon});
  background-repeat: no-repeat;
  background-position: right 15px center;
  cursor: text;

  span {
    display: block;
    max-width: calc(100% - 32px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
