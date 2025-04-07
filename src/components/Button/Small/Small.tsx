import * as S from './Small.ts';
import { PropsWithChildren } from 'react';

const SmallButton = ({ children }: PropsWithChildren) => {
  return(
    <S.Button>
      {children}
    </S.Button>
  );
};
export default SmallButton;
