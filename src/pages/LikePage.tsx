import styled from '@emotion/styled';

import getRem from '@/utils/getRem';
import Header from '@/common-ui/Header/Header';
import Icon from '@/common-ui/assets/Icon';
import Text from '@/common-ui/Text';
import useBookMarkLikeItemHandler from '@/bookmarks/service/hooks/useBookMarkLikeItemHandler';
import BookmarkLikeItem from '@/bookmarks/ui/BookmarkLikeItem';

const LikePage = () => {
  const showBackButton = true;
  const title = '좋아요 목록';
  const rightButton = <Icon name="more" size="s" />;

  const { bookMarkList, isLoading } = useBookMarkLikeItemHandler();

  return (
    <Layout>
      <Header
        title={title}
        fontSize={1.5}
        showBackButton={showBackButton}
        rightButton={rightButton}
      />

      <LBody>
        {isLoading && <Text.Span>로딩중...</Text.Span>}
        {bookMarkList.map((bookmark) => (
          <BookmarkLikeItem key={bookmark.id} {...bookmark} />
        ))}
      </LBody>
    </Layout>
  );
};

export default LikePage;

const Layout = styled.div``;
const LBody = styled.div`
  padding: 0 20px;
  margin-top: ${getRem(12)};
  row-gap: ${getRem(21)};
`;
