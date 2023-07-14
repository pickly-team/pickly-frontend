import getRem from '@/utils/getRem';
import Button from '@/common-ui/Button';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';
import { ReactNode, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { theme } from '@/styles/theme';
import BookmarkLikeButton from './Like/BookmarkLikeButton';
import {
  useDELETEBookmarkLikeQuery,
  useGETBookmarkDetailQuery,
  usePOSTBookmarkLikeQuery,
} from '../api/bookmark';
import { timeStampToDate } from '@/utils/date/timeConverter';
import CommentCountInfo from '@/comment/ui/bookmark/CommentCountInfo';
import useCommentStore from '@/store/comment';

const BookMarkArticle = () => {
  const { id: bookmarkId } = useParams<{ id: string }>();
  const { data: bookmarkDetail } = useGETBookmarkDetailQuery({
    bookmarkId: bookmarkId ?? '',
  });
  const { commentCount } = useCommentStore();

  const onErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/main.png';
    e.currentTarget.setAttribute('style', 'object-fit: contain');
  };

  const { mutate: postBookmarkLike } = usePOSTBookmarkLikeQuery({
    bookmarkId: bookmarkId ?? '',
  });
  const { mutate: postBookmarkDislike } = useDELETEBookmarkLikeQuery({
    bookmarkId: bookmarkId ?? '',
  });

  const onClickLike = () => {
    postBookmarkLike({ bookmarkId: bookmarkId ?? '' });
  };

  const onClickDislike = () => {
    postBookmarkDislike({ bookmarkId: bookmarkId ?? '' });
  };

  return (
    <Container>
      <BookMarkImage
        src={bookmarkDetail?.previewImageUrl ?? ''}
        onError={onErrorImage}
      />
      <BookMarkTitle level="h1" fontSize={1.5} weight="bold">
        {bookmarkDetail?.title ?? ''}
      </BookMarkTitle>
      <CategoryAndIconsWrapper>
        <CategoryButtonWrapper>
          <CategoryButton height={2.5} buttonColor="lightPrimary">
            <Text.Span color="black" weight="bold">
              {bookmarkDetail?.categoryName ?? ''}
            </Text.Span>
          </CategoryButton>
        </CategoryButtonWrapper>
        <LikeAndMessageIconWrapper>
          <BookmarkLikeButton
            isLike={bookmarkDetail?.isUserLike ?? false}
            onClickLike={onClickLike}
            onClickDislike={onClickDislike}
          />
          <CommentCountInfo commentCount={commentCount ?? 0} />
        </LikeAndMessageIconWrapper>
      </CategoryAndIconsWrapper>
      <BookMarkInfoWrapper>
        <BookMarkInfo
          description="등록일자"
          icon={<Icon name="calendar-plus" size="s" />}
          content={
            <Text.Span fontSize={0.75}>
              {timeStampToDate(bookmarkDetail?.createdAt ?? 0)}
            </Text.Span>
          }
        />
        <BookMarkInfo
          description="원본 URL"
          icon={<Icon name="location" size="s" />}
          content={
            <BookmarkUrl
              to={bookmarkDetail?.url ?? ''}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <Text.Span fontSize={0.75}>{bookmarkDetail?.url ?? ''}</Text.Span>
            </BookmarkUrl>
          }
        />
      </BookMarkInfoWrapper>
    </Container>
  );
};

export default BookMarkArticle;

const BookMarkInfo = ({
  description,
  icon,
  content,
}: {
  description: string;
  icon: ReactNode;
  content: ReactNode;
}) => {
  return (
    <InfoRow>
      <IconWrapper>{icon}</IconWrapper>
      <InfoTextWrapper>
        <InfoDescriptionText fontSize={0.875}>
          {description}
        </InfoDescriptionText>
        {content}
      </InfoTextWrapper>
    </InfoRow>
  );
};

const Container = styled.article``;
const BookMarkImage = styled.img`
  width: 100%;
  height: ${getRem(247)};
  object-fit: cover;
  border-radius: ${getRem(0, 0, 32, 32)};
`;

const BookMarkTitle = styled(Text.Header)`
  margin-top: ${getRem(28)};
`;

const CategoryAndIconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${getRem(15)};
`;

const CategoryButtonWrapper = styled.div`
  width: ${getRem(154)};
`;

const CategoryButton = styled(Button)`
  color: ${theme.colors.black};
`;

const IconWrapper = styled.div`
  display: flex;
`;

const LikeAndMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(12)};
`;

const BookMarkInfoWrapper = styled.div`
  padding: ${getRem(20)} 0px;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
  width: 100%;
  overflow: hidden;
`;

const BookmarkUrl = styled(Link)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: -0.3rem;
  max-width: 70%;
`;

const InfoDescriptionText = styled(Text.Span)`
  width: ${getRem(70)};
`;
const InfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 2rem;
  align-items: center;
`;
