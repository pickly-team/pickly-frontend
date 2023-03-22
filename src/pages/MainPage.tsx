import useBookMarkHandler from '@/bookmarks/service/hooks/useBookMarkHandler';
import BookmarkItem from '@/bookmarks/ui/BookmarkItem';
import BookmarkBSDeleteConfirmation from '@/bookmarks/ui/BookmarkBSDeleteConfirmation';
import BookmarkEditItem from '@/bookmarks/ui/BookmarkEditItem';
import ToggleHandler from '@/bookmarks/ui/BookmarkToggleHandler';
import UserInfo from '@/bookmarks/ui/BookmarkUserInfo';
import BottomNavigation from '@/common-ui/BottomNavigation';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';

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
        <ToggleHandler
          category={category}
          categoryOptions={categoryOptions}
          setCategory={setCategory}
          isEdit={isEdit}
          isRead={isRead}
          onChangeEdit={onChangeEdit}
          onChangeRead={onChangeRead}
        />
      </LTop>
      <LMiddle>
        {isLoading && <Text.Span>로딩중...</Text.Span>}
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
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
      <BookmarkBSDeleteConfirmation
        onClose={onCloseDeleteBS}
        open={isDeleteBSOpen}
      />
    </Layout>
  );
};

export default MainPage;

const Layout = styled.div``;
const LTop = styled.div`
  padding: 20px 20px;
`;
const LMiddle = styled.div`
  padding-bottom: 5rem;
`;
const LBottom = styled.div``;
