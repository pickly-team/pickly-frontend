import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import BookmarkRoutes from './Bookmark';
import CategoryRoutes from './Category';
import FriendRoutes from './Friend';
import MainPage from './MainPage';
import NotificationRoutes from './Notification';
import ReportRoutes from './Report';
import UserRoutes from './User';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<MainPage />} />
      {...BookmarkRoutes()}
      {...CategoryRoutes()}
      {...FriendRoutes()}
      {...NotificationRoutes()}
      {...UserRoutes()}
      {...ReportRoutes()}
    </ReactRouterRoutes>
  );
};

export default Routes;
