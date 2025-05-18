import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { Link } from 'react-router-dom';

const MYPAGE_TITLE = {
  title: '마이페이지',
  highlight: '마이페이지',
  subtitle: '회원과 관련된 정보를 수정할 수 있습니다.',
};

const MypageMain = () => {
  return (
    <main>
      <PageTitle {...MYPAGE_TITLE} />
      <div>
        <Link to="/mypage/confirm?type=edit">회원 정보 수정</Link>
        <Link to="/mypage/confirm?type=unregister">회원 탈퇴</Link>
      </div>
    </main>
  );
};

export default MypageMain;
