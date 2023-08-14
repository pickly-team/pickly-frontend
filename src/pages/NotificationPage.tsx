import { Suspense } from 'react';
import Header from '@/common-ui/Header/Header';
import NotificationSkeletonItem from '@/notification/ui/NotificationSkeletonItem';
import Notifications from '@/notification/ui/Notifications';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';

const NotificationPage = () => {
  const { handleRefresh } = useHandleRefresh({ pageType: 'NOTIFICATIONS' });

  return (
    <PullToRefresh onRefresh={handleRefresh}>
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
    </PullToRefresh>
  );
};

export default NotificationPage;
