import { Suspense } from 'react';
import Header from '@/common-ui/Header/Header';
import NotificationSkeletonItem from '@/notification/ui/NotificationSkeletonItem';
import Notifications from '@/notification/ui/Notifications';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';

const NotificationPage = () => {
  return (
    <>
      <Header title={'🔔 알림 왔어요!'} />
      <Suspense
        fallback={
          <SkeletonWrapper>
            {Array.from({ length: 5 }).map((_, index) => (
              <NotificationSkeletonItem key={index} />
            ))}
          </SkeletonWrapper>
        }
      >
        <Notifications />
      </Suspense>
    </>
  );
};

export default NotificationPage;
