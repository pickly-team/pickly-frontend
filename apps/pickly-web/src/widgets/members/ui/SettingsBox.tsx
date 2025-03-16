import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Text, Icon, theme, getRem } from '@pickly/design-system';
import {
  useGETNotificationStandardsQuery,
  usePATCHNotificationDayQuery,
} from '../api/member';
import useAuthStore from '@/shared/store/auth';
import useToast from '@/shared/ui/Toast/hooks/useToast';
import { BiSolidPencil as PencilIcon } from 'react-icons/bi';
import RoundedBox from './RoundedBox';

interface SettingsBoxProps {
  serverRemindInDays: number;
  disabled?: boolean;
}

const SettingsBox = ({
  serverRemindInDays,
  disabled = false,
}: SettingsBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [remindInDays, setRemindInDays] = useState(3);

  const { memberId } = useAuthStore();

  const { mutate } = usePATCHNotificationDayQuery({ loginId: memberId });

  const { data: defaultTime } = useGETNotificationStandardsQuery({
    loginId: memberId,
  });

  useEffect(() => {
    setRemindInDays(serverRemindInDays);
  }, [serverRemindInDays]);

  const { fireToast } = useToast();

  const toggleIsEditing = () => {
    if (disabled) return;
    if (!defaultTime?.isActive) {
      fireToast({
        message: '앗! 알림 설정이 꺼져 있어요',
        mode: 'ERROR',
      });
      return;
    }
    if (isEditing) {
      if (remindInDays === serverRemindInDays) {
        setIsEditing(!isEditing);
        return;
      }
      if (remindInDays < 1) {
        fireToast({
          message: '앗! 알림 설정 기준일은 1일 이상이어야 해요',
          mode: 'ERROR',
        });
        return;
      }
      mutate({
        patchData: {
          notifyStandardDay: remindInDays,
        },
        loginId: memberId,
      });
    }
    setIsEditing(!isEditing);
  };

  const onChangeRemainingDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (Number(value) > 99) return;
    setRemindInDays(Number(value));
  };

  return (
    <>
      <RoundedBox
        backgroundColor="white"
        style={{
          position: 'relative',
          marginTop: getRem(21),
        }}
        onClick={toggleIsEditing}
      >
        <RemindingDescription
          unreadBookmarkExists={true}
          remindInDays={remindInDays}
          isEditing={isEditing}
          onChangeRemainingDays={onChangeRemainingDays}
        />
        <SettingsButton>
          {!isEditing && (
            <PencilIcon size={getRem(30)} color={theme.colors.lightPrimary} />
          )}
          {!!isEditing && <Icon name={'check-green-reverse'} size={'xxl'} />}
        </SettingsButton>
      </RoundedBox>
    </>
  );
};

export default SettingsBox;

const SettingsButton = styled.button`
  position: absolute;
  top: calc(50% - ${getRem(18)});
  right: ${getRem(20)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemindingDescription = ({
  unreadBookmarkExists,
  remindInDays,
  isEditing,
  onChangeRemainingDays,
}: {
  unreadBookmarkExists: boolean;
  remindInDays: number;
  isEditing: boolean;
  onChangeRemainingDays: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const MAX_DAYS = 99;

  return (
    <>
      <Text.P fontSize={1.1} weight="bold" color="grey900">
        {unreadBookmarkExists
          ? '앗! 잊혀진 북마크가 있어요 🔥'
          : '북마크를 모두 읽으셨어요! 👏'}
      </Text.P>
      <StyledDescription>
        {unreadBookmarkExists ? (
          <>
            <Text.Span color={'grey900'} fontSize={0.75}>
              피클리에 추가한 즐겨찾기 게시글을
            </Text.Span>
            <RemindingLine>
              {isEditing ? (
                <StyledInput
                  height={1.2}
                  value={remindInDays}
                  type="number"
                  onChange={onChangeRemainingDays}
                  onClick={(e) => e.stopPropagation()}
                  max={MAX_DAYS}
                />
              ) : (
                <Text.Span color={'lightPrimary'} fontSize={1.1} weight="bold">
                  {`${remindInDays}`}
                </Text.Span>
              )}
              <Text.Span color={'lightPrimary'} fontSize={1.1} weight="bold">
                일
              </Text.Span>

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

const StyledDescription = styled.div`
  margin-top: ${getRem(10)};
`;
const RemindingLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getRem(10)};
`;
const StyledInput = styled.input`
  width: ${getRem(40)};
  padding: ${getRem(2.5)} ${getRem(10)};

  color: ${theme.colors.white};
  background-color: ${theme.colors.darkGrey};
  border-radius: ${getRem(8)};
  text-decoration: underline;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  margin: 0;
`;
