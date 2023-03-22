import useBookMarkHandler from '@/bookmarks/service/hooks/useBookMarkHandler2';
import BookmarkItem from '@/bookmarks/ui/BookmarkItem2';
import BSDeleteConfirmation from '@/bookmarks/ui/BookmarkBSDeleteConfirmation2';
import EditBookMarkItem from '@/bookmarks/ui/BookmarkEditItem2';
import ToggleHandler from '@/bookmarks/ui/BookmarkToggleHandler2';
import UserInfo from '@/bookmarks/ui/BookmarkUserInfo2';
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
            <EditBookMarkItem
              onClickItem={onClickBookMarkItem}
              key={bookmark.id}
              {...bookmark}
            />
          ))}
      </LMiddle>
      <LBottom>
        <BottomNavigation />
      </LBottom>
      <BSDeleteConfirmation onClose={onCloseDeleteBS} open={isDeleteBSOpen} />
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
