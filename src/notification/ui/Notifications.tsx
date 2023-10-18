import {
  ClientNotificationItem,
  useGETNotificationListQuery,
} from '@/notification/api/notification';
import useAuthStore from '@/store/auth';
import styled from '@emotion/styled';
import { NOTIFICATION_MODE } from '@/pages/NotificationPage';
import { Dispatch, useEffect, useState } from 'react';
import NotificationList from './NotificationList';

interface NotificationsProps {
  mode: NOTIFICATION_MODE;
  deleteNotificationList: string[];
  setDeleteNotificationList: Dispatch<React.SetStateAction<string[]>>;
}

const Notifications = ({
  mode,
  deleteNotificationList,
  setDeleteNotificationList,
}: NotificationsProps) => {
  // FIRST RENDER
  const { memberId } = useAuthStore();
  const { data: notificationList } = useGETNotificationListQuery({ memberId });
  const [clientNotificationList, setClientNotificationList] = useState<
    ClientNotificationItem[]
  >([]);

  useEffect(() => {
    if (notificationList) {
      setClientNotificationList(notificationList);
    }
  }, [notificationList, setClientNotificationList]);

  return (
    <Wrapper>
      <NotificationList
        mode={mode}
        notificationList={clientNotificationList ?? []}
        setClientNotificationList={setClientNotificationList}
        deleteNotificationList={deleteNotificationList}
        setDeleteNotificationList={setDeleteNotificationList}
      />
    </Wrapper>
  );
};

export default Notifications;

const Wrapper = styled.div`
  padding-bottom: 5rem;
  min-height: 80dvh;
`;
