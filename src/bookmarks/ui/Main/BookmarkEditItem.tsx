import Icon from '@/common-ui/assets/Icon';
import CheckBox from '@/common-ui/CheckBox';
import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { SyntheticEvent, useState } from 'react';
import { BookmarkItem } from '../../api/bookmark';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  TbMessageCircle2Filled as MessageFillIcon,
  TbMessageCircle2 as MessageIcon,
} from 'react-icons/tb';
import { BsBookFill as BookFillIcon } from 'react-icons/bs';
import { css } from '@emotion/react';

const BookmarkEditItem = ({
  bookmarkId,
  commentCnt,
  createdDate,
  isUserLike,
  previewImageUrl,
  readByUser,
  title,
  categoryName,
  categoryEmoji,
  onClickItem,
}: BookmarkItem & { onClickItem: (bookmarkId: number) => void }) => {
  const [checked, setChecked] = useState(false);

  const onChangeCheck = () => {
    setChecked(!checked);
    onClickItem(bookmarkId);
  };

  const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = process.env.VITE_ASSETS_URL + '/main.webp';
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
              <EllipsisText fontSize={1.1} weight="bold">
                {title}
              </EllipsisText>
              <CategoryTimeWrapper>
                <CategoryWrapper>
                  <Text.Span
                    fontSize={categoryName.length > 5 ? 0.5 : 0.8}
                    color="white"
                  >
                    {categoryEmoji}
                  </Text.Span>
                  <Text.Span
                    fontSize={categoryName.length > 5 ? 0.5 : 0.8}
                    color="white"
                    css={css`
                      text-shadow: 1px 1px 10px black;
                    `}
                  >
                    {` ${categoryName}`}
                  </Text.Span>
                </CategoryWrapper>
                <Text.Span fontSize={0.9} color="lightPrimary">
                  {createdDate}
                </Text.Span>
              </CategoryTimeWrapper>
              <IconWrapper>
                <Icon name={isUserLike ? 'like-green' : 'like'} size="xs" />
                {commentCnt > 0 && (
                  <MessageFillIcon
                    color={theme.colors.lightPrimary}
                    size={16}
                  />
                )}
                {commentCnt === 0 && (
                  <MessageIcon color={theme.colors.white} size={16} />
                )}
                {!readByUser && (
                  <BookFillIcon color={theme.colors.white} size={16} />
                )}
              </IconWrapper>
            </ItemUpperLeft>
            <ItemUpperRight>
              <Thumbnail
                src={previewImageUrl}
                effect="opacity"
                onError={onImageError}
              />
            </ItemUpperRight>
          </ItemWrapper>
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
  background-color: ${theme.colors.grey800};
`;

const CategoryTimeWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  padding: 0.1rem 0.5rem;
  background-color: ${theme.colors.lightPrimary};
  border-radius: 0.5rem;
`;
