import { Suspense } from 'react';
import Header from '@/common-ui/Header/Header';
import NotificationSkeletonItem from '@/notification/ui/NotificationSkeletonItem';
import Notifications from '@/notification/ui/Notifications';

const NotificationPage = () => {
  return (
    <>
      <Header title={'🔔 알림 왔어요!'} />
      <Suspense
        fallback={[1, 2, 3].map((item) => (
          <NotificationSkeletonItem key={item} />
        ))}
      >
        <Notifications />
      </Suspense>
    </>
  );
};

export default NotificationPage;
