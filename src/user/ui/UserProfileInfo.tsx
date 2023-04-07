import Button from '@/common-ui/Button';
import Header from '@/common-ui/Header/Header';
import EditBox from '@/user/ui/EditBox';
import EditEmoji from '@/user/ui/Emoji';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';

interface UserProfileInfoProps {
  emoji: string;
  email: string;
  name: string;
  nickname: string;
  onChangeEmoji: (emoji: string) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveButton: () => void;
}

const UserProfileInfo = ({
  emoji,
  email,
  name,
  nickname,
  onChangeEmoji,
  onChangeName,
  onChangeNickname,
  onClickSaveButton,
}: UserProfileInfoProps) => {
  return (
    <>
      <Header showBackButton />
      {/** TODO : PR 반영되면 수정 */}
      <EditEmoji emoji={emoji} onClickEmoji={() => console.log('emoji 클릭')} />
      <StyleEditBox>
        <EditBox name="이메일" value={email} onChange={onChangeName} disabled />
        <EditBox name="이름" value={name} onChange={onChangeName} isEssential />
        <EditBox
          name="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          isEssential
        />
      </StyleEditBox>
      <StyleFixedButtonWrapper>
        {/** TODO : PR 반영되면 수정 */}
        <FixedButton activeButtonColor="lightGreen" onClick={onClickSaveButton}>
          저장
        </FixedButton>
      </StyleFixedButtonWrapper>
    </>
  );
};

export default UserProfileInfo;

const StyleEditBox = styled.div`
  display: flex;
  margin-top: ${getRem(20)};
  flex-direction: column;
  padding: 0 ${getRem(20)};
`;

const StyleFixedButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  padding: 0 ${getRem(20)};
  bottom: ${getRem(20)};
  padding: 0 ${getRem(20)};
`;

const FixedButton = styled(Button)``;
