import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { useNavigate } from 'react-router-dom';
import * as S from './MypageMain.styles';
import { useAuthStore } from '@_store/authStore';

const MYPAGE_TITLE = {
  title: '마이페이지',
  highlight: '마이페이지',
  subtitle: '회원과 관련된 정보를 수정할 수 있습니다.',
};

const MypageMain = () => {
  const navigate = useNavigate();
  const { isTestUser } = useAuthStore();

  return (
    <S.Main>
      <PageTitle {...MYPAGE_TITLE} />
      <S.ButtonArea>
        <S.Button onClick={() => navigate('/mypage/confirm?type=edit')} disabled={isTestUser}>
          회원 정보 수정
        </S.Button>
        <S.Button onClick={() => navigate('/mypage/confirm?type=unregister')} disabled={isTestUser}>
          회원 탈퇴
        </S.Button>
      </S.ButtonArea>
    </S.Main>
  );
};

export default MypageMain;
