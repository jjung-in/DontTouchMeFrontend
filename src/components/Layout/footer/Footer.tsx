import TermsModal from '@_components/Auth/TermsModal/TermsModal.tsx';
import { useState } from 'react';
import * as S from './Footers.styles';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <S.FooterWrapper>
      <S.FooterInner>
        Copyright © 2025 BRIX Agency | All Rights Reserved |&nbsp;
        <S.TermsButton onClick={openModal}>개인정보처리방침</S.TermsButton>
        &nbsp;|&nbsp;
        <S.TermsButton onClick={openModal}>이용약관</S.TermsButton>
      </S.FooterInner>
      <TermsModal isOpen={isModalOpen} onClose={closeModal} />
    </S.FooterWrapper>
  );
};

export default Footer;
