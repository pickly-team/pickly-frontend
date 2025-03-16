import { Suspense, useState } from 'react';
import NotificationSkeletonItem from '@/widgets/notification/ui/skeleton/NotificationSkeletonItem';
import Notifications from '@/widgets/notification/ui/Notifications';
import useAuthStore from '@/shared/store/auth';
import useHandleRefresh from '@/shared/common/service/hooks/useHandleRefresh';
import useNotificationMode from '@/widgets/notification/hooks/useNotificationMode';
import {
  useDELETEAllNotificationQuery,
  useDELETENotificationQuery,
} from '@/widgets/notification/api/notification';
import { Header, PullToRefresh, SkeletonWrapper } from '@pickly/design-system';
import BSConfirmation from '@/shared/common/ui/BSConfirmation';
import useBottomSheet from '@/shared/ui/BottomSheet/hooks/useBottomSheet';

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
        memberId,
        notificationIds: deleteCategoryList,
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
