import React, { useState } from 'react';
import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import RoundedBox from '@/members/ui/RoundedBox';
import { theme } from '@/styles/theme';
import getRem from '@/utils/getRem';

const SettingsBox = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [remindInDays, setRemindInDays] = useState(3);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const onChangeRemainingDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
      >
        <RemindingDescription
          unreadBookmarkExists={true}
          remindInDays={remindInDays}
          isEditing={isEditing}
          onChangeRemainingDays={onChangeRemainingDays}
        />
        <SettingsButton onClick={toggleIsEditing}>
          <Icon name={'setting-green'} size={'xxl'} />
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
              {isEditing ? (
                <StyledInput
                  type="number"
                  value={remindInDays}
                  onChange={onChangeRemainingDays}
                  max={MAX_DAYS}
                />
              ) : (
                <Text.Span color={'lightPrimary'} fontSize={1.25} weight="bold">
                  {`${remindInDays}`}
                </Text.Span>
              )}
              <Text.Span color={'lightPrimary'} fontSize={1.25} weight="bold">
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

const StyledTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.grey900};
`;
const StyledDescription = styled.div`
  margin-top: ${getRem(20)};
`;
const RemindingLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${getRem(10)};
`;
const StyledInput = styled.input`
  width: ${getRem(40)};
  padding: ${getRem(3)} ${getRem(7)} ${getRem(3)} ${getRem(7)};
  color: ${theme.colors.white};
  background-color: ${theme.colors.darkGrey};
  border-radius: ${getRem(8)};
  text-decoration: underline;

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  margin: 0;
`;