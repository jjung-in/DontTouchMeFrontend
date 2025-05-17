import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-radius: 5px;
  background-color: #fff;
`;

export const Text = styled.span`
  color: #007aff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0px;
  }
`;

export const PreviewImage = styled.img`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  width: 120px;
  height: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  img {
    max-width: 70vw;
    max-height: 80vh;
    object-fit: contain;
  }
`;
