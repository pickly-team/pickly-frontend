import styled from '@emotion/styled';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import { timeStampToDate } from '@/utils/date/timeConverter';
import { navigatePath } from '@/constants/navigatePath';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

interface CommentListProps {
  profileEmoji: string;
  bookmarkId: number;
  title: string;
  nickName: string;
  content: string;
  updatedAt: number;
  category: string;
}

const CommentItem = ({
  profileEmoji,
  bookmarkId,
  title,
  nickName,
  content,
  updatedAt,
  category,
}: CommentListProps) => {
  const navigate = useNavigate();

  const navigateToBookmark = () => {
    navigate(navigatePath.BOOKMARK_DETAIL.replace(':id', String(bookmarkId)));
  };

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const convertedText = content.replace(
    urlRegex,
    (url) =>
      `<a style="color: ${theme.colors.lightPrimary}" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  );

  return (
    <>
      <Container onClick={navigateToBookmark}>
        <CommentHeader>
          <IconAndTitleWrapper>
            <StyleIconWrapper>
              {<StyleIcon name="bookmark" size={'s'} />}
            </StyleIconWrapper>
            <TitleText fontSize={getRem(18)} weight={'bold'}>
              {title}
            </TitleText>
          </IconAndTitleWrapper>
        </CommentHeader>
        <IconAndNickNameWrapper>
          <ProfileEmoji fontSize={getRem(14)}>{profileEmoji}</ProfileEmoji>
          <NicknameText fontSize={getRem(14)} weight={'bold'}>
            {nickName}
          </NicknameText>
        </IconAndNickNameWrapper>
        <ContentText
          fontSize={0.8}
          dangerouslySetInnerHTML={{ __html: convertedText }}
          onClick={(e) => {
            const target = e.target as HTMLAnchorElement;
            if (target.tagName === 'A') {
              e.preventDefault();
            }
          }}
        />
        <BottomWrapper>
          <IconAndTimeAndCategoryWrapper>
            <Icon name="timeline" size={'s'} />
            <UpdatedAtText fontSize={getRem(10)}>
              {timeStampToDate(updatedAt)}
            </UpdatedAtText>
          </IconAndTimeAndCategoryWrapper>
          <CategoryWrapper>
            <CategoryText
              fontSize={getRem(10)}
              weight={'bold'}
              css={css`
                text-shadow: 1px 1px 10px black;
              `}
            >
              {category}
            </CategoryText>
          </CategoryWrapper>
        </BottomWrapper>
      </Container>
    </>
  );
};

export default CommentItem;

const Container = styled.div`
  display: grid;
  row-gap: ${getRem(10)};
  width: 100%;
  padding: ${getRem(15, 20)};
  border-radius: ${getRem(7)};
  background-color: ${theme.colors.grey800};
`;

const StyleIcon = styled(Icon)`
  width: ${getRem(8)};
  height: ${getRem(8)};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileEmoji = styled(Text.Span)`
  margin-top: -2px;
`;

const TitleText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  font-size: ${(props) => props.fontSize};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const NicknameText = styled(Text.Span)``;

const ContentText = styled(Text.Span)`
  white-space: pre-wrap;
  line-height: 1.2;
`;
const CategoryText = styled(Text.Span)`
  margin-left: auto;
`;
const UpdatedAtText = styled(Text.Span)``;

const IconAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const IconAndNickNameWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconAndTimeAndCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(8)};
`;

const StyleIconWrapper = styled.div`
  flex-shrink: 0;
`;

const CategoryWrapper = styled.div`
  padding: 0.1rem 0.5rem;
  background-color: ${theme.colors.lightPrimary};
  border-radius: 0.5rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
`;
