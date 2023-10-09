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
import getRem from '@/utils/getRem';

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
                  <CategoryEllipsisText
                    fontSize={categoryName.length > 5 ? 0.5 : 0.8}
                    color="white"
                  >
                    {categoryEmoji}
                  </CategoryEllipsisText>
                  <CategoryEllipsisText
                    fontSize={categoryName.length > 5 ? 0.5 : 0.8}
                    color="white"
                    css={css`
                      margin-left: 0.3rem;
                      text-shadow: 1px 1px 5px black;
                    `}
                  >
                    {` ${categoryName}`}
                  </CategoryEllipsisText>
                </CategoryWrapper>
                <Text.Span
                  css={css`
                    display: flex;
                    flex-grow: 1;
                  `}
                  fontSize={0.9}
                  color="lightPrimary"
                >
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
    padding: ${getRem(15, 20)};

    transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    &:active {
      background-color: ${theme.colors.grey800};
      opacity: 0.8;
    }
    border-bottom: 1px solid ${theme.colors.grey800};
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
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

const CategoryEllipsisText = styled(Text.Span)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%; // 이 값을 조절하면서 원하시는 결과에 맞게 설정하세요
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
  display: flex;
  align-items: center;
  padding: 0.1rem 0.5rem;
  background-color: ${theme.colors.lightPrimary};
  border-radius: 0.5rem;
  max-width: 5rem;
  overflow: hidden;
  height: 1.5rem;
`;
