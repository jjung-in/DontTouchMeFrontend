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
        <S.CloseButton src={close} alt="close" onClick={onClose} />
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
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
          <S.Caption fontWeight="bold">제1조 (목적)</S.Caption>
          <S.Caption>
            이 약관은 [돈 Touch me] (이하 "서비스")와 서비스 이용하는 회원(이하 "회원") 간의 권리, 의무 및 책임사항,
            기타 필요한 사항을 규정함을 목적으로 합니다.
          </S.Caption>
        </S.TextContainer>
      </S.ModalBox>
    </S.Overlay>
  );
};

export default TermsModal;
