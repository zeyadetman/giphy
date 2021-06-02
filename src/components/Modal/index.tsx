import React from 'react';
import { CSSTransition } from 'react-transition-group';
import RCModal from 'react-modal';

interface RCModalInterface {
  isOpen: boolean;
  toggleModal: () => void;
  children: unknown;
  gif: unknown;
}
export const Modal: React.FC<RCModalInterface> = ({
  isOpen,
  toggleModal,
  children,
}) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="dialog">
      <RCModal
        closeTimeoutMS={500}
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        {children}
      </RCModal>
    </CSSTransition>
  );
};
