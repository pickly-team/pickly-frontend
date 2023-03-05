import Text from '@/common-ui/Text';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

// TODO : 추후에 유저 정보를 받아올 수 있도록 수정

// interface UserInfoProps {
//   userName: string;
// }

const UserInfo = () => {
  const userName = '피클리 마스터';
  return (
    <StyleWrapper>
      <UserBox>
        <Text.Span fontSize={2}>🥱</Text.Span>
      </UserBox>
      <Text.Span
        fontSize={1.3}
        weight="bold"
      >{`👋 안녕하세요, ${userName}님!`}</Text.Span>
    </StyleWrapper>
  );
};

export default UserInfo;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserBox = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${theme.colors.grey800};
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;
