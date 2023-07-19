import NotificationSlideItem from '@/notification/ui/skeleton/NotificationSlideItem';
import {
  useDELETENotificationQuery,
  useGETNotificationListQuery,
  usePATCHNotificationReadQuery,
} from '@/notification/api/notification';
import useAuthStore from '@/store/auth';
import BlankItem from '@/common-ui/BlankItem';

const Notifications = () => {
  // FIRST RENDER
  const { memberId } = useAuthStore();
  const { data: notificationList } = useGETNotificationListQuery({ memberId });

  // USER INTERACTION
  // 1. 알림 읽음 처리
  const { mutate: updateReadNotification } = usePATCHNotificationReadQuery({
    memberId,
  });
  const onClickReadNotification = (
    notificationId: number,
    isChecked: boolean,
  ) => {
    !isChecked && updateReadNotification({ notificationId });
  };

  // 2. 알림 삭제
  const { mutate: deleteNotification } = useDELETENotificationQuery({
    memberId,
  });
  const onClickDeleteNotification = (notificationId: number) => {
    deleteNotification({ notificationId });
  };

  return (
    <>
      {notificationList?.length === 0 && <BlankItem page="NOTIFICATION" />}
      {notificationList?.map((notification) => (
        <NotificationSlideItem
          key={notification.id}
          bookMarkInfo={{
            id: String(notification.bookmarkId),
            content: notification.content,
          }}
          createdAt={notification.createdAt}
          isRead={notification.isChecked}
          title={notification.title}
          toggleReadNotification={() =>
            onClickReadNotification(notification.id, notification.isChecked)
          }
          deleteNotification={() => onClickDeleteNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default Notifications;
