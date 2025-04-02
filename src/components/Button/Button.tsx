import * as S from './Button.ts';
import { PropsWithChildren } from 'react';

const Button = ({ children }: PropsWithChildren) => {
    return (
        <S.Button>
            {children}
        </S.Button>
    );
}

export default Button;