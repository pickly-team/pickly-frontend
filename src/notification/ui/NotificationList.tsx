import ListItem from '@/common/ui/ListItem';
import { Dispatch } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import CheckBox from '@/common-ui/CheckBox';
import { useNavigate } from 'react-router-dom';
import BlankItem from '@/common-ui/BlankItem';
import useAuthStore from '@/store/auth';
import { NOTIFICATION_MODE } from '@/pages/NotificationPage';
import {
  ClientNotificationItem,
  usePATCHNotificationReadQuery,
} from '../api/notification';
import NotificationItem from './NotificationItem';
import getRem from '@/utils/getRem';
import { navigatePath } from '@/constants/navigatePath';

interface NotificationListProps {
  mode: NOTIFICATION_MODE;
  notificationList: ClientNotificationItem[];
  setClientNotificationList: Dispatch<
    React.SetStateAction<ClientNotificationItem[]>
  >;
  deleteNotificationList: string[];
  setDeleteNotificationList: Dispatch<React.SetStateAction<string[]>>;
}

const NotificationList = ({
  mode,
  notificationList: clientNotificationList,
  setClientNotificationList,
  deleteNotificationList,
  setDeleteNotificationList,
}: NotificationListProps) => {
  const navigate = useNavigate();
  const { memberId } = useAuthStore();

  // 알림 읽음 처리
  const { mutate: updateReadNotification } = usePATCHNotificationReadQuery({
    memberId,
  });

  const onClickNotification = (
    bookmarkId: number,
    notificationId: string,
    isChecked?: boolean,
  ) => {
    if (mode === 'NORMAL') {
      !isChecked &&
        updateReadNotification({ notificationId: Number(notificationId) });
      navigate(
        `${navigatePath.BOOKMARK_DETAIL.replace(':id', String(bookmarkId))}`,
        {
          state: {
            fromPath: location.pathname,
          },
        },
      );
    }

    if (mode === 'DELETE') {
      if (deleteNotificationList.includes(notificationId))
        setDeleteNotificationList(
          deleteNotificationList.filter((id) => id !== id),
        );
      else
        setDeleteNotificationList([...deleteNotificationList, notificationId]);

      setClientNotificationList(
        clientNotificationList.map((notification) =>
          notification.id === Number(notificationId)
            ? { ...notification, isSelected: !notification.isSelected }
            : notification,
        ),
      );
    }
  };

  if (clientNotificationList?.length === 0) {
    return <BlankItem page="NOTIFICATION" />;
  }

  return (
    <Container>
      <>
        {clientNotificationList &&
          clientNotificationList.map((notification) => (
            <ListItem
              key={notification.id}
              height={80}
              withPadding={false}
              onClick={() => {
                onClickNotification(
                  notification.bookmarkId,
                  String(notification.id),
                  notification.isChecked,
                );
              }}
            >
              <ListItem.Left
                left={
                  mode === 'DELETE' && (
                    <Box>
                      <CheckBox
                        isChecked={notification.isChecked}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        onChange={() => {}}
                      />
                    </Box>
                  )
                }
                middle={
                  <NotificationItem
                    {...notification}
                    toggleReadNotification={() =>
                      onClickNotification(
                        notification.bookmarkId,
                        String(notification.id),
                        notification.isChecked,
                      )
                    }
                  />
                }
              />
            </ListItem>
          ))}
      </>
    </Container>
  );
};

export default NotificationList;

const Container = styled.div`
  min-height: 80dvh;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${getRem(20)};
  & label:first-of-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    align-self: center;

    &:active {
      background-color: ${theme.colors.grey600};
      opacity: 0.5;
    }
  }
`;
