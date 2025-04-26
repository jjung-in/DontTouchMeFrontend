import React from 'react';
import * as S from './TermsModal.styles';
import close from '@_assets/icons/close.png';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.CloseImg src={close} alt="close" onClick={onClose} />
        <S.TextContainer>
          <S.Caption fontWeight="bold" color="red">
            서비스 이용 약관/개인정보 수집 및 이용 동의
          </S.Caption>
          <S.Caption color="red">미동의 시 회원 가입 및 서비스 이용 불가</S.Caption>
        </S.TextContainer>

        <S.TextContainer>
          <S.Caption fontWeight="bold" color="red">
            마케팅 및 광고 활용 동의/위치 정보 활용 동의/이메일,문자 수신 동의
          </S.Caption>
          <S.Caption color="red">미동의 시 회원가입 및 서비스 이용 가능</S.Caption>
          <S.Caption color="red">
            마케팅 및 광고 활용 동의 시에도 이메일/문자 수신 동의 미동의를 한 경우 연락처를 통한 마케팅 정보 제공 불가
          </S.Caption>
        </S.TextContainer>

        <S.TextContainer>
          <S.Title>서비스 이용 약관</S.Title>

          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>

          <S.Caption fontWeight="bold">제2조 (용어의 정의)</S.Caption>
          <S.OrderedTermsList>
            <S.TermsItem>서비스: 돈 Touch me 서비스</S.TermsItem>
            <S.TermsItem>회원: 서비스를 이용하는 자</S.TermsItem>
          </S.OrderedTermsList>

          <S.Caption fontWeight="bold">제3조 (약관의 효력 및 변경)</S.Caption>
          <S.OrderedTermsList>
            <S.TermsItem>본 약관은 회원이 동의함으로써 효력이 발생합니다.</S.TermsItem>
            <S.TermsItem>
              회사는 필요 시 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경된 약관은 공지 후 효력을
              가집니다.
            </S.TermsItem>
          </S.OrderedTermsList>

          <S.Caption fontWeight="bold">제4조 (서비스 이용)</S.Caption>
          <S.OrderedTermsList>
            <S.TermsItem>회원은 본 약관에 따라 서비스를 이용할 수 있습니다.</S.TermsItem>
            <S.TermsItem>회사는 서비스 운영상 필요한 경우 서비스 내용을 변경하거나 중단할 수 있습니다.</S.TermsItem>
          </S.OrderedTermsList>

          <S.Caption fontWeight="bold">제5조 (회원의 의무)</S.Caption>
          <S.OrderedTermsList>
            <S.TermsItem>회원은 서비스를 이용함에 있어 관련 법령 및 본 약관을 준수해야 합니다.</S.TermsItem>
            <S.TermsItem>회원은 타인의 정보를 부정하게 사용하거나 허위 정보를 제공해서는 안 됩니다.</S.TermsItem>
          </S.OrderedTermsList>

          <S.Caption fontWeight="bold">제6조 (회사의 면책)</S.Caption>
          <S.OrderedTermsList>
            <S.TermsItem>
              회사는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단에 대해 책임지지 않습니다.
            </S.TermsItem>
            <S.TermsItem>
              회사는 회원 간 또는 회원과 제3자 간에 발생한 분쟁에 개입하지 않으며, 이에 대한 책임도 지지 않습니다.
            </S.TermsItem>
          </S.OrderedTermsList>
        </S.TextContainer>

        <S.TextContainer>
          <S.Title>개인정보 수집 및 이용 동의</S.Title>
          <S.OrderedTermsList>
            <S.TermsItem fontWeight="bold">수집하는 개인정보 항목</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>필수 항목: 연락처(전화번호/이메일)</S.TermsItem>
              <S.TermsItem>선택 항목: 이름, 경조사 관련 기타 부가 정보</S.TermsItem>
            </S.UnorderedTermsList>
            <S.TermsItem fontWeight="bold">개인정보 수집 및 이용 목적</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>서비스 제공 및 운영: 입출금 내역 정리, 경조사 관리</S.TermsItem>
              <S.TermsItem>고객 문의 대응 및 서비스 개선</S.TermsItem>
            </S.UnorderedTermsList>
          </S.OrderedTermsList>
        </S.TextContainer>

        <S.TextContainer>
          <S.Title>마케팅 및 광고 활용 동의</S.Title>

          <S.OrderedTermsList>
            <S.TermsItem fontWeight="bold">목적</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>
                회사는 회원에게 맞춤형 서비스 제공 및 이벤트/프로모션 안내를 위해 개인정보를 활용할 수 있습니다.
              </S.TermsItem>
            </S.UnorderedTermsList>

            <S.TermsItem fontWeight="bold">활용 항목</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>이메일 주소, 전화번호</S.TermsItem>
            </S.UnorderedTermsList>

            <S.TermsItem fontWeight="bold">활용 방식</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>이메일, 문자 메시지(SMS/MMS)를 통한 마케팅 정보 제공</S.TermsItem>
            </S.UnorderedTermsList>
          </S.OrderedTermsList>
        </S.TextContainer>

        <S.TextContainer>
          <S.Title>위치 정보 활용 동의</S.Title>

          <S.OrderedTermsList>
            <S.TermsItem fontWeight="bold">수집하는 위치 정보 항목</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>GPS 기반 위치 정보 또는 네트워크 기반 위치 정보</S.TermsItem>
            </S.UnorderedTermsList>

            <S.TermsItem fontWeight="bold">위치 정보 활용 목적</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>경조사 장소 등록 및 사용자 맞춤형 기능 제공</S.TermsItem>
            </S.UnorderedTermsList>
          </S.OrderedTermsList>
        </S.TextContainer>

        <S.TextContainer>
          <S.Title>이메일/문자 수신 동의</S.Title>

          <S.OrderedTermsList>
            <S.TermsItem fontWeight="bold">목적</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>
                회사는 회원에게 서비스 관련 공지사항, 업데이트 내용, 이벤트 정보를 이메일 또는 문자 메시지를 통해 발송할
                수 있습니다.
              </S.TermsItem>
            </S.UnorderedTermsList>

            <S.TermsItem fontWeight="bold">수신 항목 및 내용</S.TermsItem>
            <S.UnorderedTermsList>
              <S.TermsItem>이메일 주소, 전화번호(SMS/MMS)</S.TermsItem>
            </S.UnorderedTermsList>
          </S.OrderedTermsList>
        </S.TextContainer>

        <S.ButtonContainer>
          <S.CloseButton onClick={onClose}>창닫기</S.CloseButton>
        </S.ButtonContainer>
      </S.ModalBox>
    </S.Overlay>
  );
};

export default TermsModal;