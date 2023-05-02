import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { ClientBookMarkItem } from '../api/bookmark';
import BookMarkLikeButton from '@/bookmarks/ui/BookMarkLikeButton';
import getRem from "@/utils/getRem";

const BookmarkLikeItem = ({ title, url }: ClientBookMarkItem) => {
  return (
    <LinkWrapper to="/">
      <ItemWrapper>
        <ItemUpperLeft>
          <EllipsisText fontSize={1.2} weight="bold">
            {title}
          </EllipsisText>
          <EllipsisText fontSize={1} color="grey400">
            {url}
          </EllipsisText>
        </ItemUpperLeft>
        <ItemUpperRight></ItemUpperRight>
        {<BookMarkLikeButton isLike={true} />}
      </ItemWrapper>
      <UnderWrapper></UnderWrapper>
    </LinkWrapper>
  );
};

export default BookmarkLikeItem;

const LinkWrapper = styled(NavLink)`
  display: block;
  border-radius: ${getRem(16)};
  padding: ${getRem(10, 0)};
  margin-bottom: ${getRem(16)};
  transition: background-color 0.1s ease-in-out, opacity 0.1s ease-in-out;

  &:active {
    background-color: ${theme.colors.grey800};
    opacity: 0.5;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UnderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(7)};
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

const ItemUpperRight = styled.div`
  display: flex;
`;
