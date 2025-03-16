import { navigatePath } from '@/shared/constants/navigatePath';
import { Route } from 'react-router-dom';
import NotificationPage from './NotificationPage';

const NotificationRoutes = () => {
  return [
    <Route path={navigatePath.NOTIFICATION} element={<NotificationPage />} />,
  ];
};

export default NotificationRoutes;
