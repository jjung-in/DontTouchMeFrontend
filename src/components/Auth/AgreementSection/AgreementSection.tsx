import * as S from './AgreementSection.styles';

interface Props {
  values: {
    service: boolean;
    privacy: boolean;
    marketing: boolean;
    email: boolean;
    sms: boolean;
  };
  onChange: (name: keyof Props['values'], checked: boolean) => void;
}

const AgreementSection = ({ values, onChange }: Props) => {
  return (
    <S.Wrapper>
      <S.Header>
        <p>이용 약관 및 수신 동의</p>
        <a href="#" target="_blank" rel="noopener noreferrer">
          약관보기
        </a>
      </S.Header>
      <S.AgreementList>
        <S.AgreementItem $isChecked={values.service}>
          <label>
            <input type="checkbox" checked={values.service} onChange={(e) => onChange('service', e.target.checked)} />
            [필수] 서비스 이용 약관
          </label>
        </S.AgreementItem>
        <S.AgreementItem $isChecked={values.privacy}>
          <label>
            <input type="checkbox" checked={values.privacy} onChange={(e) => onChange('privacy', e.target.checked)} />
            [필수] 개인정보 수집 및 이용 동의
          </label>
        </S.AgreementItem>
        <S.AgreementItem $isChecked={values.marketing}>
          <label>
            <input
              type="checkbox"
              checked={values.marketing}
              onChange={(e) => onChange('marketing', e.target.checked)}
            />
            [선택] 마케팅 및 광고 활용 동의
          </label>
        </S.AgreementItem>
        <S.AgreementItem $isChecked={values.email}>
          <label>
            <input type="checkbox" checked={values.email} onChange={(e) => onChange('email', e.target.checked)} />
            [선택] 이메일 수신 동의
          </label>
        </S.AgreementItem>
        <S.AgreementItem $isChecked={values.sms}>
          <label>
            <input type="checkbox" checked={values.sms} onChange={(e) => onChange('sms', e.target.checked)} />
            [선택] SMS 수신 동의
          </label>
        </S.AgreementItem>
      </S.AgreementList>
    </S.Wrapper>
  );
};

export default AgreementSection;
