import useBookMarkHandler from '@/bookmark/hooks/useBookMarkHandler';
import BookMarkItem from '@/bookmark/ui/BookMarkItem';
import EditBookMarkItem from '@/bookmark/ui/EditBookMarkItem';
import ToggleHandler from '@/bookmark/ui/ToggleHandler';
import UserInfo from '@/bookmark/ui/UserInfo';
import BottomNavigation from '@/common-ui/BottomNavigation';
import Text from '@/common-ui/Text';
import styled from '@emotion/styled';

const MainPage = () => {
  const {
    bookMarkList,
    category,
    isEdit,
    isLoading,
    isRead,
    onChangeEdit,
    onChangeRead,
    onClickBookMarkItem,
  } = useBookMarkHandler();

  const isEditMode = !isLoading && bookMarkList?.length !== 0 && isEdit;

  return (
    <Layout>
      <LTop>
        <UserInfo />
        <ToggleHandler
          category={category}
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
            <BookMarkItem key={bookmark.id} {...bookmark} />
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
