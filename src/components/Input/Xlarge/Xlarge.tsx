import * as S from './Xlarge.ts';
import { PropsWithChildren } from 'react';

const XlargeInput = ({ children }: PropsWithChildren) => {
  return (
    <S.Input placeholder = {children}></S.Input>
  );
};

export default XlargeInput;