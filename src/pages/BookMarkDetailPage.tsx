import Header from '@/common-ui/Header/Header';
import Icon from '@/common-ui/assets/Icon';
import CommentCountInfo from '@/comment/ui/CommentCountInfo';
import CommentItem from '@/comment/ui/CommentItem';
import CommentUploadInput from '@/comment/ui/CommentUploadInput';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import BookmarkArticle from '@/bookmarks/ui/BookmarkArticle';
import BookmarkLikeButton from '@/bookmarks/ui/Like/BookmarkLikeButton';

const BookMarkDetailPage = () => {
  return (
    <>
      <Header
        rightButton={
          <button>
            <Icon name="more" size="m" />
          </button>
        }
        showBackButton
      />
      <Body>
        <BookmarkArticle
          title="발가락으로 만드는 CRUD 게시판"
          previewImgSrc="https://mblogthumb-phinf.pstatic.net/20160526_126/emo-art_1464269073322MHPQj_JPEG/zLNFIBtisESk634049407784855842.jpg?type=w800"
          category="프론트엔드"
          createdAt="2023/01/25 23:40:08"
          bookMarkUrl="https://velog.io/@aeong98"
          likeButton={<BookmarkLikeButton isLike={false} />}
          messageInfo={<CommentCountInfo commentCount={2} />}
        />
        <CommentListWrapper>
          <CommentItem
            nickname="피클리 마스터"
            content="야무진 맛도리 글 👍 자기전에 봐야징"
            updatedAt="2023/01/31 01:23:11"
            isWriter={true}
          />
          <CommentItem
            nickname="피클리 마스터"
            content="야무진 맛도리 글 👍 자기전에 봐야징"
            updatedAt="2023/01/31 01:23:11"
            isWriter={false}
          />
          <CommentItem
            nickname="피클리 마스터"
            content="야무진 맛도리 글 👍 자기전에 봐야징"
            updatedAt="2023/01/31 01:23:11"
            isWriter={false}
          />
          <CommentItem
            nickname="피클리 마스터"
            content="야무진 맛도리 글 👍 자기전에 봐야징"
            updatedAt="2023/01/31 01:23:11"
            isWriter={false}
          />
        </CommentListWrapper>
      </Body>
      <CommentUploadInputBottomBar>
        <CommentUploadInput />
      </CommentUploadInputBottomBar>
    </>
  );
};

export default BookMarkDetailPage;

const Body = styled.div`
  padding: ${getRem(0, 20)};
`;

const CommentListWrapper = styled.div`
  > * + * {
    margin-bottom: ${getRem(16)};
  }
`;

const CommentUploadInputBottomBar = styled.div`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 0;
`;
