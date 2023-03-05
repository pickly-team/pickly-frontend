import { useParams } from 'react-router-dom';
import Header from '@/common-ui/Header';
import Icon from '@/common-ui/assets/Icon';
import BookMarkArticle from '@/bookmark/ui/BookMarkArticle';
import BookMarkLikeButton from '@/bookmark/ui/BookMarkLikeButton';
import CommentCountInfo from '@/comment/ui/CommentCountInfo';

const BookMarkDetailPage = () => {
  const { id } = useParams();

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
      <BookMarkArticle
        title="발가락으로 만드는 CRUD 게시판"
        previewImgSrc="https://mblogthumb-phinf.pstatic.net/20160526_126/emo-art_1464269073322MHPQj_JPEG/zLNFIBtisESk634049407784855842.jpg?type=w800"
        category="프론트엔드"
        createdAt="2023/01/25 23:40:08"
        bookMarkUrl="https://velog.io/@aeong98"
        likeButton={<BookMarkLikeButton isLike={false} />}
        messageInfo={<CommentCountInfo commentCount={2} />}
      />
    </>
  );
};

export default BookMarkDetailPage;
