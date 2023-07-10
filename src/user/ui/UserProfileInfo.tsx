import BottomFixedButton from '@/common-ui/BottomFixedButton';
import Header from '@/common-ui/Header/Header';
import Emoji from '@/common/ui/Emoji';
import EmojiSelect from '@/common/ui/EmojiSelect';
import EditBox from '@/user/ui/EditBox';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { FormEvent } from 'react';

interface UserProfileInfoProps {
  emoji: string;
  email: string;
  name: string;
  nickname: string;
  isEmojiBSOpen: boolean;
  buttonDisabled: boolean;
  mode: Mode;
  setEmojiBSOpen: () => void;
  onChangeEmoji: (emoji: string) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserProfileInfo = ({
  emoji,
  email,
  name,
  nickname,
  isEmojiBSOpen,
  buttonDisabled,
  mode,
  setEmojiBSOpen,
  onChangeEmoji,
  onChangeName,
  onChangeNickname,
  onSubmit,
}: UserProfileInfoProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Header showBackButton={mode === 'EDIT'} />
      <Emoji emoji={emoji} onClickEmoji={setEmojiBSOpen} />
      <StyleEditBox>
        {/* <EditBox name="이메일" value={email} onChange={onChangeName} disabled /> */}
        <EditBox name="이름" value={name} onChange={onChangeName} isEssential />
        <EditBox
          name="닉네임"
          value={nickname}
          onChange={onChangeNickname}
          isEssential
        />
      </StyleEditBox>
      <BottomFixedButton
        activeButtonColor="lightGreen"
        buttonColor="buttonGreen"
        type="submit"
        disabled={buttonDisabled}
      >
        {mode === 'CREATE' ? '회원가입' : '수정하기'}
      </BottomFixedButton>
      {isEmojiBSOpen && <EmojiSelect onChangeEmoji={onChangeEmoji} />}
    </Form>
  );
};

export default UserProfileInfo;

const Form = styled.form``;

const StyleEditBox = styled.div`
  display: flex;
  margin-top: ${getRem(20)};
  flex-direction: column;
  padding: 0 ${getRem(20)};
`;
