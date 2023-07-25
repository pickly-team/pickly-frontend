import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import getRem from '@/utils/getRem';
import type { BookmarkItem } from '../../api/bookmark';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { SyntheticEvent } from 'react';

const BookmarkItem = ({
  bookmarkId,
  commentCnt,
  createdDate,
  isUserLike,
  previewImageUrl,
  readByUser,
  title,
  url,
}: BookmarkItem) => {
  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/main.png';
    e.currentTarget.setAttribute('style', 'object-fit: contain');
  };

  return (
    <LinkWrapper to={`/bookmark/${bookmarkId}`}>
      <ItemWrapper>
        <ItemUpperLeft>
          <EllipsisText fontSize={1.2} weight="bold">
            {title}
          </EllipsisText>
          <EllipsisText fontSize={1} color="lightPrimary">
            {url}
          </EllipsisText>
        </ItemUpperLeft>
        <ItemUpperRight>
          <Thumbnail
            src={previewImageUrl}
            effect="blur"
            onError={onImageError}
          />
        </ItemUpperRight>
      </ItemWrapper>
      <UnderWrapper>
        <IconWrapper>
          <Icon name={isUserLike ? 'like-green' : 'like'} size="xs" />
          <Icon name={commentCnt ? 'message-on-green' : 'message'} size="xs" />
          {!readByUser && <Icon name="not-read" size="xs" />}
        </IconWrapper>
        <Text.Span fontSize={0.9} color="lightPrimary">
          {createdDate}
        </Text.Span>
      </UnderWrapper>
    </LinkWrapper>
  );
};

export default BookmarkItem;

const LinkWrapper = styled(NavLink)`
  display: block;
  padding: ${getRem(10, 20)};
  margin-bottom: 1rem;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &:active {
    background-color: ${theme.colors.grey800};
    opacity: 0.7;
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
  margin-top: 0.4rem;
`;

const IconWrapper = styled.div`
  display: flex;
  column-gap: 0.7rem;
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

const Thumbnail = styled(LazyLoadImage)`
  width: 7rem;
  height: 5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  object-fit: contain;
`;
