import styled from '@emotion/styled';

import BookmarkToggle from '@/bookmarks/ui/Main/BookmarkToggle';
import BookmarkUserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BookmarkList from '@/bookmarks/ui/Main/BookmarkList';
import BookmarkItem from '@/bookmarks/ui/Main/BookmarkItem';
import BookmarkEditItem from '@/bookmarks/ui/Main/BookmarkEditItem';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/Main/BookmarkBSDeleteConfirmation';
import BottomNavigation from '@/common-ui/BottomNavigation';
import BookmarkSkeletonItem from '@/bookmarks/ui/Main/BookmarkSkeletonItem';
import useCategory from '@/bookmarks/service/hooks/home/useCategory';
import useBookmarkList from '@/bookmarks/service/hooks/home/useBookmarkList';
import useReadList from '@/bookmarks/service/hooks/home/useReadList';
import useDeleteBookmarkList from '@/bookmarks/service/hooks/home/useDeleteBookmarkList';

const MainPage = () => {
  const { bookMarkList, isLoading, onChangeBookmarkList } = useBookmarkList();
  const { category, categoryOptions, onChangeCategory } = useCategory();
  const { isReadMode, onClickReadMode } = useReadList();
  const {
    isEditMode: isEdit,
    isDeleteBookmarkOpen,
    onClickBookmarkItemInEdit,
    onClickDelete,
    onClickEdit,
  } = useDeleteBookmarkList({ bookMarkList, onChangeBookmarkList });

  const isEditMode = !isLoading && bookMarkList?.length !== 0 && isEdit;

  return (
    <Layout>
      <LTop>
        <BookmarkUserInfo userEmoji="😑" userName="까루" />
        <BookmarkToggle>
          <BookmarkToggle.SelectCategory
            category={category}
            categoryOptions={categoryOptions}
            setCategoryId={onChangeCategory}
          />
          <BookmarkToggle.ToggleRead
            isRead={isReadMode}
            onChangeRead={onClickReadMode}
          />
          <BookmarkToggle.ToggleEdit
            isEdit={isEdit}
            onClickEdit={onClickEdit}
          />
        </BookmarkToggle>
      </LTop>
      <LMiddle>
        {!!isLoading &&
          [1, 2, 3, 4, 5].map((item) => <BookmarkSkeletonItem key={item} />)}
        {!isLoading && bookMarkList && (
          <>
            {!isEditMode && (
              <BookmarkList
                bookmarkList={bookMarkList.filter((item) => {
                  return item.isRead === isReadMode;
                })}
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
                    onClickItem={onClickBookmarkItemInEdit}
                    {...bookMarkList}
                  />
                )}
              />
            )}
          </>
        )}
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
      {/** 북마크 삭제 확인 */}
      <BookmarkBSDeleteConfirmation
        onClose={onClickDelete}
        open={isDeleteBookmarkOpen}
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
