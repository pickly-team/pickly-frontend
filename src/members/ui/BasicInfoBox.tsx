import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';

const BasicInfoBox = ({
  nickname,
  email,
}: {
  nickname: string;
  email: string;
}) => {
  return (
    <StyleWrapper>
      <ProfileImageContainer>
        <Text.Span fontSize={3}>🥱</Text.Span>
      </ProfileImageContainer>
      <ProfileInfoContainer>
        <MarginText fontSize={1.5} weight="bold">
          {nickname}
        </MarginText>
        <Text.Span fontSize={0.875} weight="regular">
          {email}
        </Text.Span>
      </ProfileInfoContainer>
    </StyleWrapper>
  );
};

export default BasicInfoBox;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey900};
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;

const MarginText = styled(Text.Span)`
  margin-bottom: 0.9rem;
`;
