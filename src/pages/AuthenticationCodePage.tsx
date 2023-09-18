import { usePOSTMemberIdMutation } from '@/code/api/code';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Header from '@/common-ui/Header/Header';
import Text from '@/common-ui/Text';
import useAuthStore from '@/store/auth';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import useTimer from '@/utils/timer/useTimer';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { LuTimer as TimerIcon } from 'react-icons/lu';

const AuthenticationCodePage = () => {
  const { memberId } = useAuthStore();
  const { time, isFinished, resetTimer } = useTimer(5 * 60 * 1000);

  const {
    mutate: postMemberId,
    mutateAsync: postAsyncMemberId,
    data: code,
  } = usePOSTMemberIdMutation();

  const onClick_재발급하기 = async () => {
    memberId && (await postAsyncMemberId({ memberId }));
    resetTimer();
  };

  useEffect(() => {
    memberId && postMemberId({ memberId });
  }, [memberId]);

  return (
    <>
      <Header showBackButton title="인증코드 발급" />
      <TitleWrapper>
        <HeaderText level="h2" fontSize={1.3} weight="bold">
          인증코드로 로그인할 수 있습니다.
        </HeaderText>
        <DescriptionText fontSize={0.8} color="grey400">
          {
            'chrome 브라우저 > 확장 프로그램 > pickly를 검색해서\n익스텐션을 설치해주세요.'
          }
        </DescriptionText>
      </TitleWrapper>
      <ContentWrapper>
        <CodeWrapper>
          <Code fontSize={2.5} weight="bold">
            {`${code}`}
          </Code>
          <TimerWrapper>
            <TimerIcon size={getRem(20)} color={theme.colors.lightRed} />
            <TimerText fontSize={1} color="lightRed">
              {time}
            </TimerText>
          </TimerWrapper>
        </CodeWrapper>
      </ContentWrapper>
      <BottomFixedButton onClick={onClick_재발급하기} disabled={!isFinished}>
        재발급 하기
      </BottomFixedButton>
    </>
  );
};

export default AuthenticationCodePage;

const TitleWrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

const HeaderText = styled(Text.Header)`
  margin-top: 0.6rem;
`;

const DescriptionText = styled(Text.P)`
  margin-top: 0.75rem;
  white-space: pre-line;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: calc(
    100vh - ${getRem(56)} - ${getRem(52)} - ${getRem(56)} - ${getRem(56)}
  );
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CodeWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Code = styled(Text.P)``;

const TimerWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  column-gap: 0.5rem;
`;

const TimerText = styled(Text.P)``;
