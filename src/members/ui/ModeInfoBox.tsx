import styled from '@emotion/styled';

import Text from '@/common-ui/Text';
import Icon from '@/common-ui/assets/Icon';
import WhiteRoundedBox from '@/members/ui/WhiteRoundBox';
import { theme } from '@/styles/theme';

const ModeInfoBox = ({ remainingDays }: { remainingDays: number }) => {
  return (
    <WhiteRoundedBox style={{ marginTop: '1.5rem' }}>
      <Text.Span color={'grey900'} weight="bold" fontSize={1.25}>
        노말 모드 진행 중 📖
      </Text.Span>
      <ModeTextContainer>
        <Text.Div
          color={'grey900'}
          fontSize={0.75}
          weight="bold"
          style={{ marginBottom: '0.3rem' }}
        >
          피클리에 추가한 즐겨찾기 게시글을
        </Text.Div>
        <Text.Span
          color={'lightPrimary'}
          fontSize={1.25}
          weight="bold"
        >{`${remainingDays}일`}</Text.Span>
        <Text.Span color={'grey900'} fontSize={0.75} weight="bold">
          이내 읽지 않으면 알림이 울려요!
        </Text.Span>
        <ButtonListContainer>
          <ButtonContainer>
            <CircleButton>
              <Icon name={'alarm'} size={'s'} />
            </CircleButton>
            <Text.Span
              fontSize={0.75}
              weight="bold"
              color={'grey900'}
              style={{
                marginTop: '0.3rem',
              }}
            >{`${7}일째`}</Text.Span>
          </ButtonContainer>
          <ButtonContainer>
            <CircleButton>
              <Icon name={'like'} size={'s'} />
            </CircleButton>
            <Text.Span
              fontSize={0.75}
              weight="bold"
              color={'grey900'}
              style={{
                marginTop: '0.3rem',
              }}
            >{`${7}개`}</Text.Span>
          </ButtonContainer>
          <ButtonContainer>
            <CircleButton>
              <Icon name={'check'} size={'s'} />
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
      </ModeTextContainer>
    </WhiteRoundedBox>
  );
};

export default ModeInfoBox;

const ModeTextContainer = styled.div`
  margin-top: 0.5rem;
`;
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
const CircleButton = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: ${theme.colors.lightPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
