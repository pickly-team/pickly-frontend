import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { ClientBookMarkItem } from '../api/bookmark';

const BookmarkItem = ({
  title,
  url,
  imgSrc,
  isRead,
  isLiked,
  isMessage,
  date,
}: ClientBookMarkItem) => {
  return (
    <LinkWrapper to="/">
      <ItemWrapper>
        <ItemUpperLeft>
          <EllipsisText fontSize={1.2} weight="bold">
            {title}
          </EllipsisText>
          <EllipsisText fontSize={1} color="lightGreen">
            {url}
          </EllipsisText>
        </ItemUpperLeft>
        <ItemUpperRight>
          <Thumbnail src={imgSrc} />
        </ItemUpperRight>
      </ItemWrapper>
      <UnderWrapper>
        <IconWrapper>
          <Icon name={isLiked ? 'like-green' : 'like'} size="xs" />
          <Icon name={isMessage ? 'message-on-green' : 'message'} size="xs" />
          {!isRead && <Icon name="not-read" size="xs" />}
        </IconWrapper>
        <Text.Span fontSize={0.9} color="lightGreen">
          {date}
        </Text.Span>
      </UnderWrapper>
    </LinkWrapper>
  );
};

export default BookmarkItem;

const LinkWrapper = styled(NavLink)`
  display: block;
  border-radius: 1rem;
  padding: 10px 20px;
  margin-bottom: 1rem;
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

const Thumbnail = styled.img`
  width: 7rem;
  height: 5rem;
`;
