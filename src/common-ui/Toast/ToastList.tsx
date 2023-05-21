import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';
import useToastStore from '@/store/toast';
import Toast from './Toast';

const ModalPortals = ({ children }: { children: ReactNode }) => {
  const modalElement = document.getElementById('toast') as HTMLElement;
  return createPortal(children, modalElement);
};

const ToastList = () => {
  const { toasts } = useToastStore();

  if (!toasts.length) {
    return <></>;
  }

  return (
    <ModalPortals>
      <Layout>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} mode={toast.mode} />
        ))}
      </Layout>
    </ModalPortals>
  );
};

export default ToastList;

const Layout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 30;
`;
