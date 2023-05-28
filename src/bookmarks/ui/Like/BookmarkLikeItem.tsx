import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BookmarkLikeButton from './BookmarkLikeButton';
import getRem from '@/utils/getRem';
import { LikeBookmarkItem } from '../../api/like';

type BookmarkLikeItemProps = {
  onClickLikeBtn: (bookmarkId: number) => void;
} & LikeBookmarkItem;

const BookmarkLikeItem = ({
  title,
  url,
  bookmarkId,
  onClickLikeBtn,
}: BookmarkLikeItemProps) => {
  return (
    <>
      <ItemWrapper>
        <LinkWrapper to={`/bookmark/${bookmarkId}`}>
          <ItemUpperLeft>
            <EllipsisText fontSize={1.2} weight="bold">
              {title}
            </EllipsisText>
            <EllipsisText fontSize={1} color="grey400">
              {url}
            </EllipsisText>
          </ItemUpperLeft>
        </LinkWrapper>
        <BookmarkLikeButton
          isLike={true}
          onClickDislike={() => onClickLikeBtn(bookmarkId)}
        />
      </ItemWrapper>
    </>
  );
};

export default BookmarkLikeItem;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LinkWrapper = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: ${getRem(16)};
  padding: ${getRem(15, 0)};
  width: 100%;
  padding-left: ${getRem(20)};
  transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
  &:active {
    background-color: ${theme.colors.grey800};
    opacity: 0.5;
  }
`;

const ItemUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  flex: 1 1 auto;
  min-width: 0;
`;

const EllipsisText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
