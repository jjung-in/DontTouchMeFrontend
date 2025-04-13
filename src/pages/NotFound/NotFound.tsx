import Button from '@_components/Common/Button/Button';
import * as S from './NotFound.styles';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <S.Main>
      <S.ErrorCode>404 ERROR</S.ErrorCode>
      <S.ErrorMessage>
        죄송합니다. 페이지를 찾을 수 없습니다.
        <br />
        존재하지 않는 주소를 입력하셨거나
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </S.ErrorMessage>
      <Button as={Link} to="/" variant="primary" fontWeight="semibold">
        홈으로
      </Button>
    </S.Main>
  );
};

export default NotFound;
