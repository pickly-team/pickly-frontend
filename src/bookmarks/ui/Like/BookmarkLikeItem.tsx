import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import BookmarkLikeButton from './BookmarkLikeButton';
import getRem from '@/utils/getRem';
import { LikeBookmarkItem } from '../../api/like';
import { css } from '@emotion/react';

type BookmarkLikeItemProps = {
  onClickLikeBtn: (bookmarkId: number) => void;
} & LikeBookmarkItem;

const BookmarkLikeItem = ({
  title,
  categoryEmoji,
  categoryName,
  bookmarkId,
  onClickLikeBtn,
}: BookmarkLikeItemProps) => {
  return (
    <>
      <ItemWrapper>
        <LinkWrapper to={`/bookmark/${bookmarkId}`}>
          <ItemUpperLeft>
            <EllipsisText fontSize={1.1} weight="bold">
              {title}
            </EllipsisText>
            <CategoryWrapper>
              <Text.Span
                fontSize={0.8}
                color="white"
                css={css`
                  margin-top: -2px;
                  margin-right: 3px;
                `}
              >
                {categoryEmoji}
              </Text.Span>
              <Text.Span
                fontSize={0.8}
                color="white"
                css={css`
                  text-shadow: 1px 1px 10px black;
                `}
              >
                {` ${categoryName}`}
              </Text.Span>
            </CategoryWrapper>
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
  padding: ${getRem(15)} ${getRem(20)};
  column-gap: 1rem;
  transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;
  border-bottom: 1px solid ${theme.colors.grey800};
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
  row-gap: 0.8rem;
`;

const EllipsisText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CategoryWrapper = styled.div`
  padding: 0.1rem 0.5rem;
  background-color: ${theme.colors.lightPrimary};
  border-radius: 0.5rem;
  width: fit-content;
  height: 1.7rem;
  display: flex;
  align-items: center;
`;
