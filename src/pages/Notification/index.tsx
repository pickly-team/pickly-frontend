import { navigatePath } from '@/constants/navigatePath';
import { Route } from 'react-router';
import NotificationPage from './NotificationPage';

const NotificationRoutes = () => {
  return [
    <Route path={navigatePath.NOTIFICATION} element={<NotificationPage />} />,
  ];
};

export default NotificationRoutes;
