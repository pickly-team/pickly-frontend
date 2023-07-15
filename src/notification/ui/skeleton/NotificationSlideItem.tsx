import SlideItem from '@/common-ui/SlideItem';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import { Link } from 'react-router-dom';
import { navigatePath } from '@/constants/navigatePath';
import getRandomElementFromArray from '@/utils/getRandomElementFromArray';
import { timeStampToDate } from '@/utils/date/timeConverter';

const NOTIFICATION_TITLES = [
  '읽지 않은 북마크가 있어요!',
  '아껴둔 북마크 오늘은 읽어보는게 어떨까요?',
  '앗! 북마크가 잊혀지고 있어요!',
  '묵혀둔 북마크, 오늘은 꼭 읽어봐요!',
];

interface NotificationSlideItemProps {
  bookMarkInfo: {
    id: string;
    content: string;
  };
  createdAt: number;
  isRead: boolean;
  title: string;
  toggleReadNotification: () => void;
  deleteNotification: () => void;
}
const NotificationSlideItem = ({
  bookMarkInfo,
  createdAt,
  isRead,
  title = getRandomElementFromArray(NOTIFICATION_TITLES),
  toggleReadNotification,
  deleteNotification,
}: NotificationSlideItemProps) => {
  const { id, content } = bookMarkInfo;

  const showEllipse = !isRead;

  return (
    <SlideItem
      main={
        <NotificationInfoWrapper
          isRead={isRead}
          onClick={toggleReadNotification}
        >
          <Text.Span fontSize={getRem(16)} weight={'bold'}>
            {title}
          </Text.Span>
          <NotificationContentWrapper>
            <TitleAndCreatedAtLink
              to={`${navigatePath.BOOKMARK_DETAIL.replace(':id', id)}`}
            >
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
      }
      option={
        <DeleteWrapper onClick={deleteNotification}>
          <DeleteIconAndTextWrapper>
            <Icon name={'trash'} size={'s'} />
            <Text.Span>삭제</Text.Span>
          </DeleteIconAndTextWrapper>
        </DeleteWrapper>
      }
    />
  );
};

export default NotificationSlideItem;

const NotificationInfoWrapper = styled.div<{ isRead: boolean }>`
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

const TitleAndCreatedAtLink = styled(Link)`
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
const DeleteWrapper = styled.div`
  width: ${getRem(200)};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteIconAndTextWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(4)};
`;
