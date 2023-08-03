import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import { useGETUserProfile } from '@/auth/api/profile';
import useAuthStore from '@/store/auth';
import useFriendStore, { FriendType } from '@/store/friend';
import { useFlow } from '@/common-ui/stackflow';
import { Link } from '@/common-ui/Link';

const BasicInfoBox = () => {
  const { memberId } = useAuthStore();
  const { data: userInfo } = useGETUserProfile({ loginId: memberId });

  const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

  const { push } = useFlow();

  const onClickUserEdit = () => {
    push('UserInfoPage', {
      mode: 'EDIT',
    });
  };
  const onClickUserBlock = () => {
    push('BlockUserListPage', {});
  };
  const onClickHelp = () => {
    push('IntroducePage', {});
  };

  const { setSelectedType } = useFriendStore();

  const onClickFollowers = () => setSelectedType(FriendType.Follower);
  const onClickFollowings = () => setSelectedType(FriendType.Following);

  return (
    <>
      <Container>
        <ProfileNameRow>
          <NicknameColumn>
            <Text.Span fontSize={1.5}>{userInfo?.nickname ?? ''}</Text.Span>
          </NicknameColumn>
          <MoreButtonContainer>
            <TriggerBottomSheet>
              <TriggerBottomSheet.Trigger
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                as={<IconButton onClick={() => {}} name="more" size="s" />}
              />
              <TriggerBottomSheet.BottomSheet>
                <TriggerBottomSheet.Item onClick={onClickUserEdit}>
                  내 정보 수정
                </TriggerBottomSheet.Item>
                <TriggerBottomSheet.Item onClick={onClickUserBlock}>
                  차단한 사용자
                </TriggerBottomSheet.Item>
                <TriggerBottomSheet.Item onClick={onClickHelp}>
                  도움말 다시 보기
                </TriggerBottomSheet.Item>
              </TriggerBottomSheet.BottomSheet>
            </TriggerBottomSheet>
          </MoreButtonContainer>
        </ProfileNameRow>
        <ProfileInfoRow>
          <ProfileImage>
            <Text.Span fontSize={3}>{userInfo?.profileEmoji ?? ''}</Text.Span>
          </ProfileImage>
          <ProfileStatsColumn>
            <Link activityName="MainPage" activityParams={{}}>
              <ProfileStatColumn>
                <Text.Span>
                  {numberFormatter.format(userInfo?.bookmarksCount ?? 0)}
                </Text.Span>
                <Text.Span>북마크</Text.Span>
              </ProfileStatColumn>
            </Link>

            <Link
              onClick={onClickFollowers}
              activityName="FriendPage"
              activityParams={{}}
            >
              <ProfileStatColumn>
                <Text.Span>
                  {numberFormatter.format(userInfo?.followersCount ?? 0)}
                </Text.Span>
                <Text.Span>팔로워</Text.Span>
              </ProfileStatColumn>
            </Link>

            <Link
              onClick={onClickFollowings}
              activityName="FriendPage"
              activityParams={{}}
            >
              <ProfileStatColumn>
                <Text.Span>
                  {numberFormatter.format(userInfo?.followeesCount ?? 0)}
                </Text.Span>
                <Text.Span>팔로잉</Text.Span>
              </ProfileStatColumn>
            </Link>
          </ProfileStatsColumn>
        </ProfileInfoRow>
      </Container>
    </>
  );
};

export default BasicInfoBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${getRem(25)} ${getRem(20)};
  width: 100%;
  background-color: ${theme.colors.darkGrey};
  border-bottom-left-radius: 2.125rem;
  border-bottom-right-radius: 2.125rem;
`;

const NicknameColumn = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;
const ProfileNameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${getRem(16)};
`;
const MoreButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ProfileInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: ${getRem(24)};
`;
const ProfileImage = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey900};
  justify-content: center;
  align-items: center;
`;
const ProfileStatsColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: ${getRem(20.5)};
  padding-bottom: ${getRem(20.5)};
`;
const ProfileStatColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  line-height: 150%;
`;
