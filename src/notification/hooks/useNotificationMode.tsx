import TriggerBottomSheet from '@/common-ui/BottomSheet/TriggerBottomSheet';
import Text from '@/common-ui/Text';
import useToast from '@/common-ui/Toast/hooks/useToast';
import IconButton from '@/common/ui/IconButton';
import { NOTIFICATION_MODE } from '@/pages/Notification/NotificationPage';
import useAuthStore from '@/store/auth';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import {
  useGETNotificationListQuery,
  usePATCHNotificationAllReadQuery,
} from '../api/notification';

interface NotificationModeProps {
  mode: NOTIFICATION_MODE;
  setMode: Dispatch<SetStateAction<NOTIFICATION_MODE>>;
  openDeleteNotificationBS: () => void;
}

const useNotificationMode = ({
  mode,
  setMode,
  openDeleteNotificationBS,
}: NotificationModeProps) => {
  const { memberId } = useAuthStore();
  const { fireToast } = useToast();

  const { data: notificationList } = useGETNotificationListQuery({ memberId });

  const setNormalMode = () => setMode('NORMAL');

  const setReadAllMode = () => {
    const isAllRead = notificationList?.every(
      (notification) => notification.isChecked,
    );
    if (isAllRead) {
      fireToast({
        message: '앗! 이미 모든 알림을 읽었어요',
        mode: 'ERROR',
      });
      return;
    }
    setMode('READ_ALL');
  };
  const setDeleteMode = () => {
    if (notificationList?.length === 0) {
      fireToast({
        message: '앗! 아직 알림이 없어요',
        mode: 'ERROR',
      });
      return;
    }
    setMode('DELETE');
  };
  const setAllDeleteMode = () => {
    if (notificationList?.length === 0) {
      fireToast({
        message: '앗! 아직 알림이 없어요',
        mode: 'ERROR',
      });
      return;
    }
    setMode('DELETE_ALL');
    openDeleteNotificationBS();
  };

  const { mutate: patchAllRead } = usePATCHNotificationAllReadQuery({
    memberId,
  });
  const onClickReadAll = () => {
    patchAllRead({ memberId });
    setMode('NORMAL');
  };

  const headerRight = () => {
    if (mode === 'NORMAL') {
      return (
        <HeaderButtonWrapper>
          <TriggerBottomSheet>
            <TriggerBottomSheet.Trigger
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              as={<IconButton onClick={() => {}} name="more" size="s" />}
            />
            <TriggerBottomSheet.BottomSheet onClose={setNormalMode}>
              <TriggerBottomSheet.Item onClick={setReadAllMode}>
                전체 읽음
              </TriggerBottomSheet.Item>
              <TriggerBottomSheet.Item onClick={setDeleteMode}>
                삭제하기
              </TriggerBottomSheet.Item>
              <TriggerBottomSheet.Item onClick={setAllDeleteMode}>
                전체 삭제
              </TriggerBottomSheet.Item>
            </TriggerBottomSheet.BottomSheet>
          </TriggerBottomSheet>
        </HeaderButtonWrapper>
      );
    }
    if (mode === 'READ_ALL') {
      return (
        <RightButtonWrapper>
          <TextButton onClick={setNormalMode}>
            <Text.Span>취소</Text.Span>
          </TextButton>
          <TextButton onClick={onClickReadAll}>
            <Text.Span>확인</Text.Span>
          </TextButton>
        </RightButtonWrapper>
      );
    }
    if (mode === 'DELETE') {
      return (
        <RightButtonWrapper>
          <TextButton onClick={setNormalMode}>
            <Text.Span>취소</Text.Span>
          </TextButton>
          <TextButton onClick={openDeleteNotificationBS}>
            <Text.Span>삭제</Text.Span>
          </TextButton>
        </RightButtonWrapper>
      );
    }
    return null;
  };
  return { headerRight };
};

export default useNotificationMode;

const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightButtonWrapper = styled.div`
  display: flex;
  column-gap: ${getRem(20)};
`;

const TextButton = styled.button``;
