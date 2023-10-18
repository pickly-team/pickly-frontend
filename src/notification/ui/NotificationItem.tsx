import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import getRandomElementFromArray from '@/utils/getRandomElementFromArray';
import { timeStampToDate } from '@/utils/date/timeConverter';
import { ClientNotificationItem } from '../api/notification';

const NOTIFICATION_TITLES = [
  '읽지 않은 북마크가 있어요!',
  '아껴둔 북마크 오늘은 읽어보는게 어떨까요?',
  '앗! 북마크가 잊혀지고 있어요!',
  '묵혀둔 북마크, 오늘은 꼭 읽어봐요!',
];

type NotificationItemProps = {
  toggleReadNotification: () => void;
} & ClientNotificationItem;
const NotificationItem = ({
  content,
  isChecked,
  title = getRandomElementFromArray(NOTIFICATION_TITLES),
  toggleReadNotification,
  createdAt,
}: NotificationItemProps) => {
  const showEllipse = !isChecked;

  return (
    <NotificationInfoWrapper
      isRead={isChecked}
      onClick={toggleReadNotification}
    >
      <Text.Span fontSize={getRem(14)} weight={'bold'}>
        {title}
      </Text.Span>
      <NotificationContentWrapper>
        <TitleAndCreatedAtLink>
          <TitleText fontSize={getRem(12)}>{content}</TitleText>
          <CreatedAtText fontSize={getRem(8)}>
            {timeStampToDate(createdAt)}
          </CreatedAtText>
        </TitleAndCreatedAtLink>
        <EllipseWrapper>
          {showEllipse && <IsBeforeReadEllipseWrapper />}
        </EllipseWrapper>
      </NotificationContentWrapper>
    </NotificationInfoWrapper>
  );
};

export default NotificationItem;

const NotificationInfoWrapper = styled.div<{ isRead: boolean }>`
  width: 100vw;
  height: ${getRem(80)};
  padding: ${getRem(12, 20)};
  background-color: ${(p) =>
    p.isRead ? theme.colors.grey900 : theme.colors.grey800};
`;

const NotificationContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: ${getRem(18)};
  margin-top: ${getRem(8)};
`;

const TitleAndCreatedAtLink = styled.div`
  display: grid;
  width: 100%;
  border-left: 3px solid ${theme.colors.lightPrimary};
  padding-left: ${getRem(8)};
`;

const TitleText = styled(Text.Span)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: ${getRem(4)};
`;

const CreatedAtText = styled(Text.Span)``;

const EllipseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
const IsBeforeReadEllipseWrapper = styled.div`
  width: ${getRem(8)};
  height: ${getRem(8)};
  border-radius: 100%;
  background-color: ${theme.colors.lightPrimary};
`;
