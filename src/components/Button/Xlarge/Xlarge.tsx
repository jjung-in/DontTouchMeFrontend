import * as S from './Xlarge.ts';
import { PropsWithChildren } from 'react';

const XlargeButton = ({ children }: PropsWithChildren) => {
  return( 
    <S.Button>
      {children}
    </S.Button>
  );
};

export default XlargeButton;
