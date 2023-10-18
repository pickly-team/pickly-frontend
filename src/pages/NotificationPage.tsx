import { Suspense, useState } from 'react';
import Header from '@/common-ui/Header/Header';
import NotificationSkeletonItem from '@/notification/ui/skeleton/NotificationSkeletonItem';
import Notifications from '@/notification/ui/Notifications';
import SkeletonWrapper from '@/common-ui/SkeletonWrapper';
import PullToRefresh from '@/common-ui/PullToRefresh';
import useHandleRefresh from '@/common/service/hooks/useHandleRefresh';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import useNotificationMode from '@/notification/hooks/useNotificationMode';
import BSConfirmation from '@/common/ui/BSConfirmation';
import useAuthStore from '@/store/auth';
import {
  useDELETEAllNotificationQuery,
  useDELETENotificationQuery,
} from '@/notification/api/notification';

export type NOTIFICATION_MODE = 'NORMAL' | 'READ_ALL' | 'DELETE' | 'DELETE_ALL';

const NotificationPage = () => {
  const { memberId } = useAuthStore();
  const { handleRefresh } = useHandleRefresh({ pageType: 'NOTIFICATIONS' });

  const [mode, setMode] = useState<NOTIFICATION_MODE>('NORMAL');
  const { isOpen, open, close } = useBottomSheet();

  const onClose = () => {
    setMode('NORMAL');
    close();
  };

  const { headerRight } = useNotificationMode({
    mode,
    setMode,
    openDeleteNotificationBS: open,
  });

  const [deleteCategoryList, setDeleteCategoryList] = useState<string[]>([]);
  // 단일 삭제
  const { mutateAsync: mutateDeleteCategory } = useDELETENotificationQuery({
    memberId,
  });
  // 전체 삭제
  const { mutateAsync: mutateDeleteAllCategory } =
    useDELETEAllNotificationQuery({
      memberId,
    });
  const onClickDelete = async () => {
    // NOTE : 임시로 하나씩 삭제 call
    if (mode === 'DELETE') {
      await mutateDeleteCategory({
        notificationId: Number(deleteCategoryList[0]),
      });
    }
    if (mode === 'DELETE_ALL') {
      await mutateDeleteAllCategory({
        memberId,
      });
    }
    setMode('NORMAL');
    close();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Header title={'🔔 알림 왔어요!'} rightButton={headerRight()} />
      <Suspense
        fallback={
          <SkeletonWrapper>
            {Array.from({ length: 5 }).map((_, index) => (
              <NotificationSkeletonItem key={index} />
            ))}
          </SkeletonWrapper>
        }
      >
        <Notifications
          mode={mode}
          deleteNotificationList={deleteCategoryList}
          setDeleteNotificationList={setDeleteCategoryList}
        />
        <BSConfirmation
          title="정말로 삭제 할까요?"
          description={
            mode === 'DELETE'
              ? '선택한 알림을 삭제합니다.'
              : '모든 알림을 삭제합니다.'
          }
          open={isOpen}
          onCancel={onClose}
          onClose={onClose}
          onConfirm={onClickDelete}
        />
      </Suspense>
    </PullToRefresh>
  );
};

export default NotificationPage;
