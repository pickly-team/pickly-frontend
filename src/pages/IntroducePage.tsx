import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import Divider from '@/category/ui/Divider';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Text from '@/common-ui/Text';
import { navigatePath } from '@/constants/navigatePath';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import SettingsBox from '@/members/ui/SettingsBox';
import useAuthStore from '@/store/auth';
import getRem from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const IntroducePage = () => {
  const { showIntroduce, setShowIntroduce } = useAuthStore();

  const navigate = useNavigate();
  const onClickConfirm = () => {
    if (showIntroduce) {
      navigate(navigatePath.PROFILE);
      setShowIntroduce(false);
    }
    if (!showIntroduce) navigate(-1);
  };

  return (
    <>
      <Title level="h2" fontSize={1.5} weight="bold">
        피클리는 이런 서비스에요
      </Title>
      {/** Pick 1 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 1.
        </SubTitle>
        <Description>북마크를 자유롭게 추가할 수 있어요!</Description>
      </BoxWrapper>
      <BookmarkItem
        bookmarkId={1}
        commentCnt={3}
        isUserLike
        createdDate="20"
        previewImageUrl="/image/"
        readByUser={false}
        title="피클리는 이런 서비스에요"
        url="https://velog.io"
        disabled
      />
      <DividerWrapper paddingSize="s">
        <Divider size="m" margin="off" />
      </DividerWrapper>
      {/** Pick 2 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 2.
        </SubTitle>
        <Description>북마크를 자유롭게 추가할 수 있어요!</Description>
      </BoxWrapper>
      <PaddingWrapper>
        <SettingsBox serverRemindInDays={3} disabled />
      </PaddingWrapper>
      <DividerWrapper paddingSize="m">
        <Divider size="m" margin="off" />
      </DividerWrapper>
      {/** Pick 3 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 3.
        </SubTitle>
        <Description>친구들과 북마크를 공유해 보세요!</Description>
      </BoxWrapper>
      <PaddingWrapper
        css={css`
          margin-bottom: 10rem;
        `}
      >
        <FriendFollowingItem
          id={1}
          name="피클리"
          memberId={1}
          profileEmoji="😃"
          isFollowing={false}
          isBlocked={false}
          disabled
        />
      </PaddingWrapper>
      <BottomFixedButton onClick={onClickConfirm}>확인했어요</BottomFixedButton>
    </>
  );
};

export default IntroducePage;

const Title = styled(Text.Header)`
  padding: 0 ${getRem(20)};
  margin: ${getRem(50)} 0 ${getRem(20)} 0;
`;

const BoxWrapper = styled.div`
  h3 {
    margin-top: ${getRem(10)};
    margin-bottom: ${getRem(15)};
  }
  p {
    margin-bottom: ${getRem(10)};
  }
`;

const SubTitle = styled(Text.Header)`
  padding: 0 ${getRem(20)};
`;

const Description = styled(Text.P)`
  padding: 0 ${getRem(20)};
`;

const PaddingWrapper = styled.div`
  padding: 0 ${getRem(20)};
`;

interface Size {
  paddingSize: 's' | 'm';
}

const DividerWrapper = styled.div<Size>`
  padding: ${(props) =>
    props.paddingSize === 's'
      ? `${getRem(5)} 0 ${getRem(15)} 0`
      : `${getRem(20)} 0`};
`;
