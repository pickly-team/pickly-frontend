import styled from '@emotion/styled';
import Text from '../Text';
import Button from '../Button';
import { theme } from '@/styles/theme';
import Header from '../Header/Header';
import { ActivityComponentType } from '@stackflow/react';

const NetworkError: ActivityComponentType = () => {
  const reload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <>
      <Header showBackButton backButtonCallback={reload} />
      <Wrapper>
        <ErrorImage src="/images/network-error.png" />
        <ErrorText>{'앗! 네트워크에 문제가\n 있는거 같아요'}</ErrorText>
        <ErrorButton buttonColor="lightPrimary" onClick={reload}>
          다시 시도하기
        </ErrorButton>
      </Wrapper>
    </>
  );
};

export default NetworkError;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100svh - 5rem);
  background-color: ${theme.colors.black};
  flex-direction: column;
`;

const ErrorImage = styled.img`
  width: 6rem;
  height: 10rem;
`;

const ErrorText = styled(Text.Span)`
  margin-top: 1.3rem;
  white-space: pre-line;
  text-align: center;
`;

const ErrorButton = styled(Button)`
  width: 50%;
  color: ${theme.colors.black};
  margin-top: 1.5rem;
`;
