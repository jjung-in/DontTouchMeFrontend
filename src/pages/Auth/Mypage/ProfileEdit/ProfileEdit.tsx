import required from '@_assets/images/required.png';
import Button from '@_components/Common/Button/Button';
import Input from '@_components/Common/Input/Input';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import { useProfileEdit } from '@_hooks/useAuth';
import { ErrorTextStyle } from '@_styles/event';
import * as S from './ProfileEdit.styles';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@_store/authStore';
import { useEffect } from 'react';

const PROFILE_EDIT_TITLE = {
  title: '회원 정보 수정',
  highlight: '회원 정보 수정',
  subtitle: '회원가입 시 입력한 정보를 수정하세요!',
};

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { isCheckedPassword } = useAuthStore();
  const { formValues, formErrors, handleChange, handleSubmit, isPending } = useProfileEdit();

  useEffect(() => {
    if (!isCheckedPassword) {
      navigate('/mypage/confirm');
    }
  }, [isCheckedPassword, navigate]);

  return (
    <S.Main>
      <PageTitle {...PROFILE_EDIT_TITLE} />
      <S.Form onSubmit={handleSubmit}>
        <S.FieldArea>
          <S.FieldContainer>
            <S.FieldLabel>
              이름
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              maxLength={10}
              placeholder="이름을 입력하세요"
              autoComplete="off"
              state={formErrors.name ? 'error' : 'default'}
            />
            {formErrors.name && <ErrorTextStyle>{formErrors.name}</ErrorTextStyle>}
          </S.FieldContainer>

          <S.FieldContainer>
            <S.FieldLabel>
              이메일
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input placeholder="이메일은 수정할 수 없습니다." disabled />
          </S.FieldContainer>

          <S.FieldContainer>
            <S.FieldLabel>
              비밀번호
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              maxLength={20}
              placeholder="새 비밀번호를 입력하세요"
              autoComplete="new-password"
              state={formErrors.newPassword ? 'error' : 'default'}
            />
            {formErrors.newPassword ? (
              <ErrorTextStyle>{formErrors.newPassword}</ErrorTextStyle>
            ) : (
              <S.HintText>비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.</S.HintText>
            )}
          </S.FieldContainer>

          <S.FieldContainer>
            <S.FieldLabel>
              비밀번호 확인
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              maxLength={20}
              placeholder="비밀번호를 다시 입력하세요"
              autoComplete="new-password"
              state={formErrors.confirmPassword ? 'error' : 'default'}
            />
            {formErrors.confirmPassword && <ErrorTextStyle>{formErrors.confirmPassword}</ErrorTextStyle>}
          </S.FieldContainer>

          <S.FieldContainer>
            <S.FieldLabel>
              연락처
              <img src={required} alt="필수 입력" />
            </S.FieldLabel>
            <Input
              type="tel"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              maxLength={20}
              placeholder="연락처를 입력하세요"
              autoComplete="off"
              state={formErrors.contact ? 'error' : 'default'}
            />
            {formErrors.contact && <ErrorTextStyle>{formErrors.contact}</ErrorTextStyle>}
          </S.FieldContainer>
        </S.FieldArea>

        <S.ButtonArea>
          <Button type="submit" variant="primary" fontWeight="semibold" fullWidth disabled={isPending}>
            저장
          </Button>
        </S.ButtonArea>
      </S.Form>
    </S.Main>
  );
};

export default ProfileEdit;
