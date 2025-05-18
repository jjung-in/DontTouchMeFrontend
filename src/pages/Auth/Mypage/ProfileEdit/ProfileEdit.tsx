import Input from '@_components/Common/Input/Input';
import Button from '@_components/Common/Button/Button';
import PageTitle from '@_components/Common/PageTitle/PageTitle';
import * as S from './ProfileEdit.styles';
import { ErrorTextStyle, FieldContainerStyle, FieldLabelStyle } from '@_styles/event';
import required from '@_assets/images/required.png';


const EDIT_TITLE = {
  title: '회원 정보 수정',
  highlight: '회원 정보 수정',
  subtitle: '회원가입시 입력한 정보를 수정하세요!'
}
const ProfileEdit = () => {
  return (
    <S.Main>
      <PageTitle {...EDIT_TITLE}/>
      <S.Form>
        <S.FieldArea>
          <FieldContainerStyle>
            <FieldLabelStyle>
              이름
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              placeholder="이름을 입력하세요"
            />
            <ErrorTextStyle></ErrorTextStyle>
          </FieldContainerStyle>
          <FieldContainerStyle>
            <FieldLabelStyle>
              이메일
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              placeholder="이메일을 입력하세요"
            />
            <ErrorTextStyle></ErrorTextStyle>
          </FieldContainerStyle>
          <FieldContainerStyle>
            <FieldLabelStyle>
              비밀번호
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              placeholder="비밀번호를 입력하세요"
            />
            <ErrorTextStyle></ErrorTextStyle>
          </FieldContainerStyle>
          <FieldContainerStyle>
            <FieldLabelStyle>
              비밀번호 확인
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              placeholder="비밀번호를 한번 더 입력하세요"
            />
            <ErrorTextStyle></ErrorTextStyle>
          </FieldContainerStyle>
          <FieldContainerStyle>
            <FieldLabelStyle>
              연락처
              <img src={required} alt="필수 입력" />
            </FieldLabelStyle>
            <Input
              placeholder="연락처를 입력하세요"
            />
            <ErrorTextStyle></ErrorTextStyle>
          </FieldContainerStyle>
        </S.FieldArea>
        <S.ButtonArea>
          <Button type="submit" variant="primary" fontWeight="semibold" fullWidth={true}>
            저장
          </Button>
        </S.ButtonArea>
      </S.Form>
    </S.Main>
  )
}

export default ProfileEdit