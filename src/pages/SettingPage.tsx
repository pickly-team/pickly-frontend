import Header from '@/common-ui/Header/Header';
import Text from '@/common-ui/Text';
import useWebview from '@/common/service/hooks/useWebview';
import { navigatePath } from '@/constants/navigatePath';
import useAuthStore from '@/store/auth';
import useVersionStore, { CURRENT_VERSION } from '@/store/version';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { FiChevronRight as ArrowIcon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const { initializeUserInfo } = useAuthStore();
  const router = useNavigate();

  const onClickUserEdit = () => {
    router(navigatePath.USER_EDIT);
  };
  const onClickCode = () => {
    router(navigatePath.CODE);
  };
  const onClickHelp = () => {
    router(navigatePath.INTRODUCE);
  };
  const onClickUserBlock = () => {
    router(navigatePath.BLOCK_USER);
  };

  const { postMessage } = useWebview();
  const onClickLogout = () => {
    initializeUserInfo();
    postMessage('signUp', null);
  };

  const { version, platform } = useVersionStore();
  const onClickUpdate = () => {
    // ios의 경우 앱스토어 링크로 이동
    if (version !== CURRENT_VERSION)
      window.open(
        platform === 'iOS'
          ? 'https://apps.apple.com/kr/app/pickly/id6450514861'
          : 'https://play.google.com/store/apps/details?id=com.ww8007.pickly',
        '_blank',
      );
  };

  return (
    <>
      <Header title="설정" showBackButton={true} />
      <ContentWrapper>
        <Content text="내 정보 수정" onClick={onClickUserEdit} />
        <Content text="인증코드 발급" onClick={onClickCode} />
        <Content text="도움말 다시 보기" onClick={onClickHelp} />
        <Content text="차단한 사용자" onClick={onClickUserBlock} />
        <Content
          text="앱 버전"
          subText={version !== CURRENT_VERSION ? '최신 버전입니다' : '업데이트'}
          onClick={onClickUpdate}
        />
        <Content text="로그아웃" onClick={onClickLogout} />
      </ContentWrapper>
    </>
  );
};

export default SettingPage;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

interface ContentProps {
  text: string;
  subText?: string;
  onClick: () => void;
}

const Content = ({ text, subText, onClick }: ContentProps) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonText>{text}</ButtonText>
      <RightWrapper>
        {!!subText && <SubText color="grey400">{subText}</SubText>}
        {!subText && <ArrowIcon size={getRem(20)} color="grey400" />}
      </RightWrapper>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 ${getRem(20)};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.grey900};
  height: ${getRem(56)};
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  :active {
    background-color: ${({ theme }) => theme.colors.grey800};
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SubText = styled(Text.P)`
  margin-right: 1rem;
`;

const ButtonText = styled(Text.Span)``;
