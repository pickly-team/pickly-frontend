import Header from '@/common-ui/Header/Header';
import Notifications from '@/notification/ui/Notifications';

const NotificationPage = () => {
  return (
    <>
      <Header title={'🔔 알림 왔어요!'} />
      <Notifications />
    </>
  );
};

export default NotificationPage;
