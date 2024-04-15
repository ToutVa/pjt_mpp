import React, { useContext } from 'react';
import loadable from '@loadable/component';
import { ModalsDispatchContext, ModalsStateContext } from './recoil/PopupAtom';

export const modals = {
  alertModal: loadable(() => import('../component/AlertModal')),
  confirmModal: loadable(() => import('../component/ConfirmModal')),
  // signupModal: loadable(() => import('../pages/register/SignupModal')),
  // loginModal: loadable(() => import('../pages/register/LoginModal')),
};

const Modals = () => {
  const openedModals = useContext(ModalsStateContext);
  const { close } = useContext(ModalsDispatchContext);

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;

    const onClose = () => {
      close(Component);
    };

    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') {
        await onSubmit();
      }
      onClose();
    };

    return (
      <Component
        {...restProps}
        key={index}
        onClose={onClose}
        onSubmit={handleSubmit}
        msg={props.msg}
      />
    );
  });
};

export default Modals;
