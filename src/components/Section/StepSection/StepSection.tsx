import * as S from './StepSection.styles';
import FadeInUp from '@_components/Animation/FadeInUp/FadeInUp';
import logo from '@_assets/images/Logo.png';
import calendar from '@_assets/images/main-calendar.png';
import check from '@_assets/images/main-check.png';
import line from '@_assets/images/curve-line.png';
import finger from '@_assets/icons/finger.png';

const steps = [
  {
    icon: logo,
    step: 'STEP 01',
    title: '시작하기',
    desc: '간단한 회원 가입 후<br /> 서비스를 이용해보세요!',
  },
  {
    icon: calendar,
    step: 'STEP 02',
    title: '이벤트 등록',
    desc: '이벤트 정보를 등록하고, 입출금 내역도 입력하세요!<br />기존 엑셀 파일을 불러오는 것도 가능해요.',
  },
  {
    icon: check,
    step: 'STEP 03',
    title: '정산 완료',
    desc: '최종 입출금 내역을 확인하고, 파일로 저장해요.<br />이벤트 참여자에게 감사장 전송도 가능해요.',
  },
];

const StepSection = () => {
  return (
    <S.Section>
      <FadeInUp delay={0.1}>
        <S.Title>
          <S.HighlightText>페이블</S.HighlightText> 이렇게 이용하세요!
        </S.Title>
      </FadeInUp>
      <S.Steps>
        {steps.map((step, index) => (
          <S.Step key={index}>
            <S.StepImg>
              <img src={step.icon} />
            </S.StepImg>
            <S.StepContent>
              <S.StepLabel>{step.step}</S.StepLabel>
              <S.StepTitle>{step.title}</S.StepTitle>
              <S.StepDesc key={index} dangerouslySetInnerHTML={{ __html: step.desc }} />
            </S.StepContent>
            {index < steps.length - 1 && (
              <S.CurveImg>
                <img src={line} />
              </S.CurveImg>
            )}
          </S.Step>
        ))}
      </S.Steps>
      <S.LinkButton to="/events/create">
        이벤트 등록 바로가기
        <img src={finger} />
      </S.LinkButton>
    </S.Section>
  );
};

export default StepSection;
