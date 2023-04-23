import NotificationSlideItem from '@/notification/ui/skeleton/NotificationSlideItem';
import { useGetNotifications } from '@/notification/api/notification';

const Notifications = () => {
  const { data } = useGetNotifications();

  return (
    <>
      {data?.map((notification) => (
        <NotificationSlideItem
          key={notification.id}
          bookMarkInfo={{
            id: notification.id,
            title: notification.title,
          }}
          createdAt={notification.createdAt}
          isRead={notification.isRead}
        />
      ))}
    </>
  );
};

export default Notifications;
