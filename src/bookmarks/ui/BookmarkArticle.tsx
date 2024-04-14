import CommentCountInfo from '@/comment/ui/bookmark/CommentCountInfo';
import DisabledButton from '@/common-ui/DisabledButton';
import Text from '@/common-ui/Text';
import useToast from '@/common-ui/Toast/hooks/useToast';
import Icon from '@/common-ui/assets/Icon';
import useWebview from '@/common/service/hooks/useWebview';
import useAuthStore from '@/store/auth';
import useBookmarkStore from '@/store/bookmark';
import useCommentStore from '@/store/comment';
import { theme } from '@/styles/theme';
import { timeStampToDate } from '@/utils/date/timeConverter';
import getRem from '@/utils/getRem';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { BsFillClipboard2Fill as CopyIcon } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import {
  GET_BOOKMARK_LIST,
  useDELETEBookmarkLikeQuery,
  useGETBookmarkDetailQuery,
  usePOSTBookmarkLikeQuery,
} from '../api/bookmark';
import BookmarkLikeButton from './Like/BookmarkLikeButton';

const BookMarkArticle = () => {
  const { id: bookmarkId } = useParams<{ id: string }>();
  const { memberId } = useAuthStore();
  const { data: bookmarkDetail } = useGETBookmarkDetailQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
  });
  const { commentCount } = useCommentStore();

  const queryClient = useQueryClient();

  const { selectedCategoryId } = useBookmarkStore();

  useEffect(() => {
    queryClient.refetchQueries(
      GET_BOOKMARK_LIST(memberId, '👀 읽음', selectedCategoryId),
    );
    queryClient.refetchQueries(
      GET_BOOKMARK_LIST(memberId, '🫣 읽지 않음', selectedCategoryId),
    );
    queryClient.refetchQueries(
      GET_BOOKMARK_LIST(memberId, '📖 전체', selectedCategoryId),
    );
  }, [bookmarkId, selectedCategoryId, memberId, queryClient]);

  const onErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = process.env.VITE_ASSETS_URL + '/main.webp';
    e.currentTarget.setAttribute('style', 'object-fit: contain');
  };

  const { mutate: postBookmarkLike } = usePOSTBookmarkLikeQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
  });
  const { mutate: postBookmarkDislike } = useDELETEBookmarkLikeQuery({
    bookmarkId: bookmarkId ?? '',
    memberId,
  });

  const [isMyPost, setIsMyPost] = useState(false);

  useEffect(() => {
    setIsMyPost(bookmarkDetail?.memberId === memberId);
  }, [bookmarkDetail?.memberId, memberId]);

  const onClickLike = () => {
    if (!isMyPost) return;
    postBookmarkLike({ bookmarkId: bookmarkId ?? '' });
  };

  const onClickDislike = () => {
    if (!isMyPost) return;
    postBookmarkDislike({ bookmarkId: bookmarkId ?? '' });
  };

  const { postMessage } = useWebview();

  const onClickBookmarkUrl = () => {
    postMessage('visitBookmark', {
      url: bookmarkDetail?.url ?? '',
    });
  };

  const { fireToast } = useToast();

  const onClickCopyUrl = () => {
    window.navigator.clipboard.writeText(bookmarkDetail?.url ?? '');
    fireToast({ message: 'URL이 복사되었어요' });
  };

  return (
    <>
      <BookMarkImage
        src={bookmarkDetail?.previewImageUrl ?? ''}
        onError={onErrorImage}
        effect="opacity"
        width={'100%'}
        onClick={onClickBookmarkUrl}
      />
      <Container>
        <BookMarkTitle level="h1" fontSize={1.5} weight="bold">
          {bookmarkDetail?.title ?? ''}
        </BookMarkTitle>
        <CategoryAndIconsWrapper>
          <CategoryButtonWrapper>
            <CategoryButton height={2.5} buttonColor="lightPrimary">
              <Text.Span>{bookmarkDetail?.categoryEmoji ?? '📖 '} </Text.Span>
              {bookmarkDetail?.categoryName && (
                <CategoryText
                  color="white"
                  weight="bold"
                  fontSize={bookmarkDetail.categoryName.length > 5 ? 0.8 : 1}
                  css={css`
                    text-shadow: 1px 1px 5px ${theme.colors.grey800};
                  `}
                >
                  {bookmarkDetail.categoryName}
                </CategoryText>
              )}
            </CategoryButton>
          </CategoryButtonWrapper>
          <LikeAndMessageIconWrapper>
            <IconWrapper onClick={onClickCopyUrl}>
              <CopyIcon color={theme.colors.lightPrimary} size={24} />
            </IconWrapper>
            <BookmarkLikeButton
              isLike={bookmarkDetail?.isUserLike ?? false}
              isMyPost={isMyPost}
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
              <BookmarkUrl onClick={onClickBookmarkUrl}>
                <Text.Span fontSize={0.75} color="lightPrimary">
                  {bookmarkDetail?.url ?? ''}
                </Text.Span>
              </BookmarkUrl>
            }
          />
        </BookMarkInfoWrapper>
      </Container>
    </>
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

const Container = styled.article`
  padding: ${getRem(0, 20)};
`;
const BookMarkImage = styled(LazyLoadImage)`
  width: 100%;
  height: ${getRem(247)};
  border-radius: ${getRem(0, 0, 32, 32)};
  object-fit: cover;
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
  max-width: calc(100vw / 2 - ${getRem(20)});
  min-width: ${getRem(150)};
`;

const CategoryButton = styled(DisabledButton)`
  color: ${theme.colors.black};
  padding: 1rem;
  column-gap: 0.3rem;
`;

const CategoryText = styled(Text.Span)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const BookmarkUrl = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 70%;
  margin-bottom: 0.2rem;
  color: ${theme.colors.lightPrimary};
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
