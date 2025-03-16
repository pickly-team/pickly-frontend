import { theme, Text } from '@pickly/design-system';
import styled from '@emotion/styled';
import FollowButton from '@/widgets/friend/ui/buttons/FollowButton';
import UnFollowButton from '@/widgets/friend/ui/buttons/UnFollowButton';

// TODO : 추후에 유저 정보를 받아올 수 있도록 수정

interface BookmarkUserInfoProps {
  userEmoji: string;
  userName: string;
  isFriendPage?: {
    isFollowing: boolean;
    friendId: number;
    memberId: number;
    isBlocked: boolean;
  };
  rightButton?: React.ReactNode;
}

const BookmarkUserInfo = ({
  userEmoji,
  userName,
  isFriendPage,
  rightButton,
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
            fontSize={1.1}
            weight="bold"
          >{`👋 안녕하세요, ${userName}님!`}</Text.Span>
        )}
      </TextWrapper>
      {!!isFriendPage && (
        <>
          {!!isFriendPage?.isFollowing && (
            <UnFollowButton
              followerId={isFriendPage.memberId}
              memberId={isFriendPage.friendId}
              isBlocked={isFriendPage.isBlocked}
            />
          )}
          {!isFriendPage?.isFollowing && (
            <FollowButton
              followerId={isFriendPage.memberId}
              memberId={isFriendPage.friendId}
              isBlocked={isFriendPage.isBlocked}
            />
          )}
        </>
      )}
      {!isFriendPage && <>{rightButton}</>}
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
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;
