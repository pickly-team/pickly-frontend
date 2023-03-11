import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import RoundedBox from '@/members/ui/RoundedBox';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import NotificationSettingsBottomSheet from '@/members/ui/NotificationSettingsBottomSheet';

const SettingsBox = ({ remainingDays }: { remainingDays: number }) => {
  const { isOpen, open, close } = useBottomSheet();

  return (
    <>
      <RoundedBox
        backgroundColor="white"
        style={{
          position: 'relative',
          marginTop: getRem(21),
        }}
      >
        <RemindingDescription
          unreadBookmarkExists={true}
          remainingDays={remainingDays}
        />
        <SettingsButton onClick={open}>
          <Icon name={'setting-green'} size={'xxl'} />
        </SettingsButton>
      </RoundedBox>
      <NotificationSettingsBottomSheet open={isOpen} onClose={close} />
    </>
  );
};

export default SettingsBox;

const SettingsButton = styled.button`
  position: absolute;
  top: calc(50% - ${getRem(18)});
  right: ${getRem(20)};
`;

const RemindingDescription = ({
  unreadBookmarkExists,
  remainingDays,
}: {
  unreadBookmarkExists: boolean;
  remainingDays: number;
}) => {
  return (
    <>
      <StyledTitle>
        {unreadBookmarkExists
          ? '앗! 잊혀진 북마크가 있어요 🔥'
          : '북마크를 모두 읽으셨어요! 👏'}
      </StyledTitle>
      <StyledDescription>
        {unreadBookmarkExists ? (
          <>
            <Text.Span color={'grey900'} fontSize={0.75}>
              피클리에 추가한 즐겨찾기 게시글을
            </Text.Span>
            <RemindingLine>
              <Text.Span
                color={'lightPrimary'}
                fontSize={1.25}
                weight="bold"
              >{`${remainingDays}일 `}</Text.Span>
              <Text.Span color={'grey900'} fontSize={0.75}>
                이내 읽지 않으면 알림이 울려요!
              </Text.Span>
            </RemindingLine>
          </>
        ) : (
          <Text.Span color={'grey900'} fontSize={0.75}>
            피클리에 새로운 즐겨찾기를 추가해보세요!
          </Text.Span>
        )}
      </StyledDescription>
    </>
  );
};

const StyledTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.grey900};
`;
const StyledDescription = styled.div`
  margin-top: ${getRem(20)};
`;
const RemindingLine = styled.div`
  margin-top: ${getRem(10)};
`;
