import Icon from '@/common-ui/assets/Icon';
import CheckBox from '@/common-ui/CheckBox';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { SyntheticEvent, useState } from 'react';
import { BookmarkItem } from '../../api/bookmark';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const BookmarkEditItem = ({
  bookmarkId,
  commentCnt,
  createdDate,
  isUserLike,
  previewImageUrl,
  readByUser,
  title,
  url,
  onClickItem,
}: BookmarkItem & { onClickItem: (bookmarkId: number) => void }) => {
  const [checked, setChecked] = useState(false);

  const onChangeCheck = () => {
    setChecked(!checked);
    onClickItem(bookmarkId);
  };

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/main.png';
    e.currentTarget.setAttribute('style', 'object-fit: contain');
  };

  return (
    <Box>
      <CheckBox
        id={String(bookmarkId)}
        isChecked={checked}
        onChange={onChangeCheck}
      >
        <Wrapper>
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
              <Icon
                name={commentCnt ? 'message-on-green' : 'message'}
                size="xs"
              />
              {!readByUser && <Icon name="not-read" size="xs" />}
            </IconWrapper>
            <Text.Span fontSize={0.9} color="lightPrimary">
              {createdDate}
            </Text.Span>
          </UnderWrapper>
        </Wrapper>
      </CheckBox>
    </Box>
  );
};

export default BookmarkEditItem;

// TODO : Checkbox label에 접근 불가하여 한번 더 Wrapping 추후 해결
const Box = styled.div`
  & label:first-of-type {
    justify-content: space-between;
    padding: 10px 20px;
    margin-bottom: 1rem;
    border-radius: 1rem;
    transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    &:active {
      background-color: ${theme.colors.grey800};
      opacity: 0.8;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
