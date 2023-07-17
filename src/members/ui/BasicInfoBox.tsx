import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import IconButton from '@/common/ui/IconButton';
import { navigatePath } from '@/constants/navigatePath';

const BasicInfoBox = ({
  memberId,
  profileEmoji,
  nickname,
  bookmarksCount,
  followersCount,
  followeesCount,
}: {
  memberId: number;
  profileEmoji: string;
  nickname: string;
  bookmarksCount: number;
  followersCount: number;
  followeesCount: number;
}) => {
  const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

  const router = useNavigate();

  const onClickUserEdit = () => {
    router(navigatePath.USER_EDIT);
  };
  const onClickUserBlock = () => {
    router(navigatePath.BLOCK_USER);
  };

  return (
    <>
      <Container>
        <ProfileNameRow>
          <NicknameColumn>
            <Text.Span fontSize={1.5}>{nickname}</Text.Span>
            {/* <LinkContainer to={`/user/${memberId}/edit`}>
              <Icon name={'circle-pencil'} size={'l'} />
            </LinkContainer> */}
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
              </TriggerBottomSheet.BottomSheet>
            </TriggerBottomSheet>
          </MoreButtonContainer>
        </ProfileNameRow>
        <ProfileInfoRow>
          <ProfileImage>
            <Text.Span fontSize={3}>{profileEmoji}</Text.Span>
          </ProfileImage>
          <ProfileStatsColumn>
            <Link to={'/'}>
              <ProfileStatColumn>
                <Text.Span>{numberFormatter.format(bookmarksCount)}</Text.Span>
                <Text.Span>북마크</Text.Span>
              </ProfileStatColumn>
            </Link>

            <Link to={'/friend'}>
              <ProfileStatColumn>
                <Text.Span>{numberFormatter.format(followersCount)}</Text.Span>
                <Text.Span>팔로워</Text.Span>
              </ProfileStatColumn>
            </Link>

            <Link to={'/friend'}>
              <ProfileStatColumn>
                <Text.Span>{numberFormatter.format(followeesCount)}</Text.Span>
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
