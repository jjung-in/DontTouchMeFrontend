import * as S from './Middle.ts';
import { PropsWithChildren } from 'react';

const MiddleButton = ({ children }: PropsWithChildren) => {
  return (
    <S.Button>
      {children}
    </S.Button>
  );
}
export default MiddleButton;