import styled from '@emotion/styled';

import useBookmarkHandler from '@/bookmarks/service/hooks/useBookmarkHandler2';
import BookmarkToggleHandler from '@/bookmarks/ui/Main/BookmarkToggleHandler';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BookmarkList from '@/bookmarks/ui/Main/BookmarkList';
import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import BookmarkEditItem from '@/bookmarks/ui/Main/BookmarkEditItem';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/Main/BookmarkBSDeleteConfirmation';
import BottomNavigation from '@/common-ui/BottomNavigation';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';

const MainPage = () => {
  const {
    bookMarkList,
    isEdit,
    isLoading,
    isRead,
    onClick편집,
    onChangeRead,
    onClickBookMarkItem,
    isDeleteBSOpen,
    onClick삭제,
    categoryOptions,
    category,
    setCategory,
  } = useBookmarkHandler();

  const isEditMode = !isLoading && bookMarkList?.length !== 0 && isEdit;

  console.log('bookMarkList', bookMarkList);
  console.log(isLoading);
  return (
    <Layout>
      <LTop>
        <BookmarkUserInfo userEmoji="😑" userName="까루" />
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
            onClick편집={onClick편집}
          />
        </BookmarkToggleHandler>
      </LTop>
      <LMiddle>
        {isLoading &&
          [1, 2, 3, 4, 5].map((item) => <BookmarkSkeletonItem key={item} />)}
        {!isEditMode && (
          <BookmarkList
            bookmarkList={bookMarkList}
            renderItem={(bookMarkList) => (
              <BookmarkItem key={bookMarkList.id} {...bookMarkList} />
            )}
          />
        )}
        {isEditMode && (
          <BookmarkList
            bookmarkList={bookMarkList}
            renderItem={(bookMarkList) => (
              <BookmarkEditItem
                key={bookMarkList.id}
                onClickItem={onClickBookMarkItem}
                {...bookMarkList}
              />
            )}
          />
        )}
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
      {/** 북마크 삭제 확인 */}
      <BookmarkBSDeleteConfirmation
        onClose={onClick삭제}
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
