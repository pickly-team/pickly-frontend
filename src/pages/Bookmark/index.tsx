import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import BookMarkDetailPage from './BookMarkDetailPage';
import BookmarkAddPage from './BookmarkAddPage';
import BookmarkEditPage from './BookmarkEditPage';
import BookmarkPage from './BookmarkPage';
import BookmarkSearchPage from './BookmarkSearchPage';

const BookmarkRoutes = () => {
  return [
    <Route path={navigatePath.BOOKMARK} element={<BookmarkPage />} />,
    <Route
      path={navigatePath.BOOKMARK_SEARCH}
      element={<BookmarkSearchPage />}
    />,
    <Route
      path={navigatePath.BOOKMARK_DETAIL}
      element={<BookMarkDetailPage />}
    />,
    <Route path={navigatePath.BOOKMARK_ADD} element={<BookmarkAddPage />} />,
    <Route path={navigatePath.BOOKMARK_EDIT} element={<BookmarkEditPage />} />,
  ];
};

export default BookmarkRoutes;
