import useBookMarkHandler from '@/bookmarks/service/hooks/useBookMarkHandler';
import BookmarkItem from '@/bookmarks/ui/BookmarkItem';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/BookmarkBSDeleteConfirmation';
import BookmarkEditItem from '@/bookmarks/ui/BookmarkEditItem';
import BookmarkToggleHandler from '@/bookmarks/ui/BookmarkToggleHandler';
import UserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BottomNavigation from '@/common-ui/BottomNavigation';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';
import { Suspense } from 'react';

const MainPage = () => {
  const {
    bookMarkList,
    isEdit,
    isLoading,
    isRead,
    onChangeEdit,
    onChangeRead,
    onClickBookMarkItem,
    isDeleteBSOpen,
    onCloseDeleteBS,
    categoryOptions,
    category,
    setCategory,
  } = useBookMarkHandler();

  const isEditMode = !isLoading && bookMarkList?.length !== 0 && isEdit;

  return (
    <Layout>
      <LTop>
        <UserInfo />
        <BookmarkToggleHandler>
          <BookmarkToggleHandler.SelectCategory
            category={category}
            categoryOptions={categoryOptions}
            setCategory={setCategory}
          />
          <BookmarkToggleHandler.ToggleRead
            isRead={isRead}
            onChangeRead={onChangeRead}
          />
          <BookmarkToggleHandler.ToggleEdit
            isEdit={isEdit}
            onChangeEdit={onChangeEdit}
          />
        </BookmarkToggleHandler>
      </LTop>
      <LMiddle>
        <Suspense fallback={<Text.Span>로딩중...</Text.Span>}>
          {!isEditMode &&
            bookMarkList.map((bookmark) => (
              <BookmarkItem key={bookmark.id} {...bookmark} />
            ))}
          {isEditMode &&
            bookMarkList.map((bookmark) => (
              <BookmarkEditItem
                onClickItem={onClickBookMarkItem}
                key={bookmark.id}
                {...bookmark}
              />
            ))}
        </Suspense>
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
      {/** 북마크 삭제 확인 */}
      <BookmarkBSDeleteConfirmation
        onClose={onCloseDeleteBS}
        open={isDeleteBSOpen}
      />
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div`
  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll {
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
`;
const LTop = styled.div`
  padding: 20px 20px;
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
const LBottom = styled.div``;
