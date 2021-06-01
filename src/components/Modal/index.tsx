import React from 'react';
import { CSSTransition } from 'react-transition-group';
import RCModal from 'react-modal';

interface RCModalInterface {
  isOpen: boolean;
  toggleModal: () => void;
  children: any;
  gif: any;
}
export const Modal: React.FC<any> = ({
  isOpen,
  toggleModal,
  children,
  gif,
}: RCModalInterface) => {
  console.log({ gif });
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="dialog">
      <RCModal closeTimeoutMS={500} isOpen={isOpen} ariaHideApp={false}>
        <button onClick={toggleModal}>x</button>
        {children}
      </RCModal>
    </CSSTransition>
  );
};
