import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import FriendBookmarkPage from './FriendBookmarkPage';
import FriendPage from './FriendPage';
import FriendSearchPage from './FriendSearchPage';

const FriendRoutes = () => {
  return [
    <Route
      path={navigatePath.FRIEND_BOOKMARK}
      element={<FriendBookmarkPage />}
    />,
    <Route path={navigatePath.FRIEND} element={<FriendPage />} />,
    <Route path={navigatePath.FRIEND_SEARCH} element={<FriendSearchPage />} />,
  ];
};

export default FriendRoutes;
