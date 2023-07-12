import Text from '@/common-ui/Text';
import FollowButton from '@/friend/ui/buttons/FollowButton';
import UnFollowButton from '@/friend/ui/buttons/UnFollowButton';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

// TODO : 추후에 유저 정보를 받아올 수 있도록 수정

interface BookmarkUserInfoProps {
  userEmoji: string;
  userName: string;
  isFriendPage?: {
    isFollowing: boolean;
  };
}

const BookmarkUserInfo = ({
  userEmoji,
  userName,
  isFriendPage,
}: BookmarkUserInfoProps) => {
  return (
    <StyleWrapper>
      <TextWrapper>
        <UserBox>
          <Text.Span fontSize={2}>{userEmoji}</Text.Span>
        </UserBox>
        {!!isFriendPage && (
          <Text.Span fontSize={1.125}>{`${userName}님의 Pickly`}</Text.Span>
        )}
        {!isFriendPage && (
          <Text.Span
            fontSize={1.375}
            weight="bold"
          >{`👋 안녕하세요, ${userName}님!`}</Text.Span>
        )}
      </TextWrapper>
      {!!isFriendPage && (
        <>
          {!!isFriendPage?.isFollowing && <UnFollowButton userId={'1'} />}
          {!isFriendPage?.isFollowing && <FollowButton userId={'1'} />}
        </>
      )}
    </StyleWrapper>
  );
};

export default BookmarkUserInfo;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserBox = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;
