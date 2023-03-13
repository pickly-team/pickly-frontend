import React, { useState } from 'react';
import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import RoundedBox from '@/members/ui/RoundedBox';
import { ColorType, theme } from '@/styles/theme';
import { numberWithCommas } from '@/utils/numberWithCommas';

const ModeInfoBox = ({
  remainingDays,
  daysPassedSinceCurrentMode,
  numberOfStaleBookmarks,
}: {
  remainingDays: number;
  daysPassedSinceCurrentMode: number;
  numberOfStaleBookmarks: number;
}) => {
  const [isHardMode, setIsHardMode] = useState(false);

  return (
    <RoundedBox
      backgroundColor={isHardMode ? 'lightPrimary' : 'white'}
      style={{ marginTop: '1.5rem' }}
    >
      <ModeText isHardMode={isHardMode} remainingDays={remainingDays} />
      <ButtonListContainer>
        <ButtonContainer>
          <CircleButton backgroundColor={isHardMode ? 'white' : 'lightPrimary'}>
            {isHardMode ? (
              <Icon name={'alarm-green'} size={'s'} />
            ) : (
              <Icon name={'like'} size={'s'} />
            )}
          </CircleButton>
          <Text.Span
            fontSize={0.75}
            weight="bold"
            color={'grey900'}
            style={{
              marginTop: '0.3rem',
            }}
          >{`${numberWithCommas(daysPassedSinceCurrentMode)}일째`}</Text.Span>
        </ButtonContainer>
        <ButtonContainer>
          <CircleButton backgroundColor={isHardMode ? 'white' : 'lightPrimary'}>
            {isHardMode ? (
              <Icon name={'like-green'} size={'s'} />
            ) : (
              <Icon name={'like'} size={'s'} />
            )}
          </CircleButton>
          <Text.Span
            fontSize={0.75}
            weight="bold"
            color={'grey900'}
            style={{
              marginTop: '0.3rem',
            }}
          >{`${numberWithCommas(numberOfStaleBookmarks)}개`}</Text.Span>
        </ButtonContainer>
        <ButtonContainer>
          <CircleButton
            backgroundColor={isHardMode ? 'white' : 'lightPrimary'}
            onClick={() => setIsHardMode(!isHardMode)}
          >
            {isHardMode ? (
              <Icon name={'people-green'} size={'s'} />
            ) : (
              <Icon name={'people'} size={'s'} />
            )}
          </CircleButton>
          <Text.Span
            fontSize={0.75}
            weight="bold"
            color={'grey900'}
            style={{
              marginTop: '0.3rem',
            }}
          >
            모드 변경
          </Text.Span>
        </ButtonContainer>
      </ButtonListContainer>
    </RoundedBox>
  );
};

export default ModeInfoBox;

const ButtonListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.25rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleButton = ({
  children,
  backgroundColor = 'lightPrimary',
  onClick,
}: {
  children: React.ReactNode;
  backgroundColor?: ColorType;
  onClick?: () => void;
}) => {
  return (
    <StyledCircleButton
      style={{
        backgroundColor: theme.colors[backgroundColor],
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick ? onClick : () => {}
      }
    >
      {children}
    </StyledCircleButton>
  );
};

const StyledCircleButton = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModeText = ({
  isHardMode,
  remainingDays,
}: {
  isHardMode: boolean;
  remainingDays: number;
}) => {
  const modedTitle = (isHardMode: boolean) => {
    return isHardMode ? '하드 모드 진행 중 🔥' : '노말 모드 진행 중 📖';
  };
  const modedDescription = (isHardMode: boolean) => {
    return isHardMode
      ? '이내 읽지 않으면 북마크가 삭제 돼요!'
      : '이내 읽지 않으면 알림이 울려요!';
  };

  return (
    <>
      <ModeTitle>{modedTitle(isHardMode)}</ModeTitle>
      <ModeDescriptionContainer>
        <Text.Div color={'grey900'} fontSize={0.75} weight="bold">
          피클리에 추가한 즐겨찾기 게시글을
        </Text.Div>
        <div style={{ marginTop: '0.3rem' }}>
          <Text.Span
            color={isHardMode ? 'white' : 'lightPrimary'}
            fontSize={1.25}
            weight="bold"
          >{`${remainingDays}일 `}</Text.Span>
          <Text.Span color={'grey900'} fontSize={0.75} weight="bold">
            {modedDescription(isHardMode)}
          </Text.Span>
        </div>
      </ModeDescriptionContainer>
    </>
  );
};

const ModeTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${theme.colors.grey900};
`;
const ModeDescriptionContainer = styled.div`
  margin-top: 0.5rem;
`;
