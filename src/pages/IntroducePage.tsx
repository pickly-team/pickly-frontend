import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import Divider from '@/category/ui/Divider';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Text from '@/common-ui/Text';
import useBottomIntersection from '@/common/service/hooks/useBottomIntersection';
import { navigatePath } from '@/constants/navigatePath';
import FriendFollowingItem from '@/friend/ui/friend/FriendFollowingItem';
import SettingsBox from '@/members/ui/SettingsBox';
import getRem from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroducePage = () => {
  const navigate = useNavigate();
  const onClickConfirm = () => {
    navigate(navigatePath.PROFILE);
  };

  const [isShowButton, setIsShowButton] = useState(false);
  const showButton = () => {
    setIsShowButton(true);
  };

  const { bottom } = useBottomIntersection({
    fetchNextPage: showButton,
  });

  return (
    <ContentWrapper>
      <Title level="h2" fontSize={1.5} weight="bold">
        피클리는 이런 서비스에요
      </Title>
      {/** Pick 1 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 1.
        </SubTitle>
        <Description>
          {
            '북마크를 자유롭게 추가할 수 있어요!\n북마크를 추가하면 다음과 같이 보여요'
          }
        </Description>
      </BoxWrapper>
      <BookmarkWrapper>
        <BookmarkItem
          bookmarkId={1}
          commentCnt={3}
          isUserLike
          createdDate="2023-08-09"
          previewImageUrl="/image/"
          readByUser={false}
          title="북마크를 추가한 예시에요"
          url="https://velog.io"
          disabled
          categoryEmoji="📚"
          categoryName="개발"
        />
      </BookmarkWrapper>
      <DividerWrapper paddingSize="s">
        <Divider size="m" margin="off" />
      </DividerWrapper>
      {/** Pick 2 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 2.
        </SubTitle>
        <Description>읽지 않은 북마크는 저희가 알려드릴게요!</Description>
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
      <PaddingWrapper>
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

      <DividerWrapper paddingSize="m">
        <Divider size="m" margin="off" />
      </DividerWrapper>
      {/** Pick 4 */}
      <BoxWrapper>
        <SubTitle level="h3" fontSize={1.5} weight="bold">
          Pick 4.
        </SubTitle>
        <Description>북마크를 어디서든 추가해보세요!</Description>
      </BoxWrapper>

      <PaddingWrapper>
        <DescriptionBox>
          <DescriptionText fontSize={0.85} color="white" weight="bold">
            {
              '🖥️ : Pickly Chrome Extension\n 📱 : URL 공유하기 기능\n\n 더 자세한 내용은 내 정보 페이지 > FAQ를 확인해주세요!'
            }
          </DescriptionText>
        </DescriptionBox>
      </PaddingWrapper>

      <BlankBox
        css={css`
          margin-bottom: 5rem;
        `}
      />
      <div ref={bottom} />
      <BlankBox
        css={css`
          margin-bottom: 7rem;
        `}
      />

      <BottomFixedButton disabled={!isShowButton} onClick={onClickConfirm}>
        <Text.Span weight="bold">확인했어요</Text.Span>
      </BottomFixedButton>
    </ContentWrapper>
  );
};

export default IntroducePage;

const ContentWrapper = styled.div`
  overflow-y: scroll;
`;

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

const BookmarkWrapper = styled.div`
  /* padding: 0 ${getRem(20)}; */
`;

const SubTitle = styled(Text.Header)`
  padding: 0 ${getRem(20)};
`;

const Description = styled(Text.P)`
  padding: 0 ${getRem(20)};
  white-space: pre-line;
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

const DescriptionBox = styled.div`
  background-color: ${({ theme }) => theme.colors.grey900};
  padding: ${getRem(10)};
  border-radius: ${getRem(8)};
`;

const DescriptionText = styled(Text.P)`
  white-space: pre-line;
`;

const BlankBox = styled.div``;
