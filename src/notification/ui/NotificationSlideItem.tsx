import SlideItem from '@/common-ui/SlideItem';
import styled from '@emotion/styled';
import getRem from '@/utils/getRem';
import { theme } from '@/styles/theme';
import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import formatDate from '@/utils/date/formatDate';

interface NotificationSlideItemProps {
  bookMarkInfo: {
    id: string;
    title: string;
  };
  createdAt: Date;
  isRead: boolean;
}
const NotificationSlideItem = ({
  bookMarkInfo,
  createdAt,
  isRead,
}: NotificationSlideItemProps) => {
  const { title } = bookMarkInfo;

  const createdAtDate = new Date(createdAt);
  const todayDate = new Date();
  const createdAtByToday = formatDate(createdAtDate, todayDate);

  return (
    <StyledSlideItem
      main={
        <NotificationInfoWrapper isRead={isRead}>
          <Text.Span fontSize={getRem(16)} weight={'bold'}>
            읽지 않은 북마크가 있어요!
          </Text.Span>
          <NotificationContentWrapper>
            <TitleAndCreatedAtWrapper>
              <TitleText fontSize={getRem(12)}>{title}</TitleText>
              <CreatedAtText fontSize={getRem(8)}>
                {createdAtByToday}
              </CreatedAtText>
            </TitleAndCreatedAtWrapper>
            <IsReadEllipseWrapper>
              {isRead && <IsReadEllipse />}
            </IsReadEllipseWrapper>
          </NotificationContentWrapper>
        </NotificationInfoWrapper>
      }
      option={
        <DeleteWrapper>
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

const StyledSlideItem = styled(SlideItem)`
  height: ${getRem(80)};
`;

const NotificationInfoWrapper = styled.div<{ isRead: boolean }>`
  height: 100%;
  padding: ${getRem(12, 20)};
  background-color: ${(p) =>
    p.isRead ? theme.colors.grey800 : theme.colors.black};
`;

const NotificationContentWrapper = styled.div`
  display: grid;
  grid-template-columns: ${getRem(400)} 1fr;
  margin-top: ${getRem(8)};
`;

const TitleAndCreatedAtWrapper = styled.div`
  display: grid;
  height: 100%;
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

const IsReadEllipseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
const IsReadEllipse = styled.div`
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
