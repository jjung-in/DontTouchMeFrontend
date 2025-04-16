import * as S from './Large.ts';
import { PropsWithChildren } from 'react';

const LargeButton = ({ children }: PropsWithChildren) => {
  return (
    <S.Button>
      {children}
    </S.Button>
  );
}
export default LargeButton;