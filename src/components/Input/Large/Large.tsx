import * as S from './Large.ts';
import { PropsWithChildren } from 'react';

const LargeInput = ({ children } : PropsWithChildren) => {
  return (
    <S.Input placeholder = {children}></S.Input>
  );
}
export default LargeInput;