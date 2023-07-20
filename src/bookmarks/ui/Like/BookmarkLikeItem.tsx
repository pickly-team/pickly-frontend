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
  padding: ${getRem(10)} ${getRem(20)};
  column-gap: 1rem;
  transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
  &:active {
    background-color: ${theme.colors.grey800};
    opacity: 0.8;
  }
`;

const LinkWrapper = styled(Link)`
  display: flex;
  align-items: center;
  flex: 1 1 0;
  overflow: hidden;
`;

const ItemUpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 1rem;
`;

const EllipsisText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
