import required from '@_assets/images/required.png';
import Button from '@_components/Common/Button/Button';
import Input from '@_components/Common/Input/Input';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { useCheckPassword } from '@_hooks/useAuth';
import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as S from './PasswordCheck.styles';

const VALID_PARAM_TYPES = ['edit', 'unregister'];

const PasswordCheck_TITLE = {
  title: '비밀번호 확인',
  highlight: '비밀번호 확인',
  subtitle: '회원정보 수정을 위해 비밀번호를 확인해주세요.',
};

const PasswordCheck = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const { password, error, handleChange, handleSubmit, isPending } = useCheckPassword();

  useEffect(() => {
    if (!type || !VALID_PARAM_TYPES.includes(type)) {
      setSearchParams({ type: 'edit' });
    }
  }, [type, setSearchParams]);

  return (
    <S.Main>
      <PageTitle {...PasswordCheck_TITLE} />
      <S.Form onSubmit={handleSubmit}>
        <S.FieldArea>
          <FieldContainerStyle>
            <FieldLabelStyle>
              비밀번호
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              autoComplete="new-password"
            />
            {error && <ErrorTextStyle>{error}</ErrorTextStyle>}
          </FieldContainerStyle>
        </S.FieldArea>
        <S.ButtonArea>
          <Button type="submit" variant="primary" fontWeight="semibold" fullWidth={true} disabled={isPending}>
            확인
          </Button>
        </S.ButtonArea>
      </S.Form>
    </S.Main>
  );
};

export default PasswordCheck;
