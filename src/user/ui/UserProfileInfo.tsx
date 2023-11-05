import Text from '@/common-ui/Text';
import Emoji from '@/common/ui/Emoji';
import EmojiSelect from '@/common/ui/EmojiSelect';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { FormEvent, ReactNode } from 'react';
import EditBox from './EditBox';
import BSDeleteConfirmation from '@/bookmarks/ui/Main/BSDeleteConfirmation';
import { useDELETEUserInfoQuery } from '@/members/api/member';
import useAuthStore from '@/store/auth';
import useWebview from '@/common/service/hooks/useWebview';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';

interface UserProfileInfo2Props {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserProfileInfo = ({ children, onSubmit }: UserProfileInfo2Props) => {
  return <Form onSubmit={onSubmit}>{children}</Form>;
};

interface EmojiSelectorProps {
  emoji: string;
  isEmojiBSOpen: boolean;
  setEmojiBSOpen: () => void;
  closeEmojiBS: () => void;
  onChangeEmoji: (emoji: string) => void;
}

const EmojiSelector = ({
  emoji,
  isEmojiBSOpen,
  setEmojiBSOpen,
  closeEmojiBS,
  onChangeEmoji,
}: EmojiSelectorProps) => {
  return (
    <>
      <Emoji emoji={emoji} onClickEmoji={setEmojiBSOpen} />
      {isEmojiBSOpen && (
        <EmojiBackDrop onClick={closeEmojiBS}>
          <EmojiSelect onChangeEmoji={onChangeEmoji} />
        </EmojiBackDrop>
      )}
    </>
  );
};

interface EditBoxProps {
  name: string;
  nickname: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditBoxGroup = ({
  name,
  nickname,
  onChangeName,
  onChangeNickname,
}: EditBoxProps) => {
  return (
    <StyleEditBox>
      <EditBox name="이름" value={name} onChange={onChangeName} isEssential />
      <EditBox
        name="닉네임 ( 특수문자 제외 )"
        value={nickname}
        onChange={onChangeNickname}
        isEssential
        withCount
      />
    </StyleEditBox>
  );
};

const DeleteUserInfo = () => {
  const {
    isOpen: deleteUserInfoBS,
    open: openDeleteUserInfo,
    close: closeDeleteUserInfo,
  } = useBottomSheet();

  const { memberId, initializeUserInfo } = useAuthStore();
  const { postMessage } = useWebview();
  const { mutate: deleteUserInfo } = useDELETEUserInfoQuery();
  const onClickDeleteUserInfo = () => {
    deleteUserInfo({ loginId: memberId });
    initializeUserInfo();
    postMessage('signUp', null);
  };
  return (
    <>
      <DeleteUserInfoWrapper>
        <DeleteUserInfoText
          onClick={openDeleteUserInfo}
          fontSize={0.8}
          color="grey600"
        >
          탈퇴하기
        </DeleteUserInfoText>
      </DeleteUserInfoWrapper>
      <BSDeleteConfirmation
        open={deleteUserInfoBS}
        onClose={closeDeleteUserInfo}
        onDelete={onClickDeleteUserInfo}
        mainText="정말로 탈퇴할까요?"
        subText="탈퇴하면 다시 복구할 수 없습니다. 탈퇴하시겠습니까?"
        buttonText="탈퇴"
      />
    </>
  );
};

UserProfileInfo.EmojiSelector = EmojiSelector;
UserProfileInfo.EditBoxGroup = EditBoxGroup;
UserProfileInfo.DeleteUserInfo = DeleteUserInfo;

export default UserProfileInfo;

const Form = styled.form``;

const EmojiBackDrop = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 100;
`;

const StyleEditBox = styled.div`
  display: flex;
  margin-top: ${getRem(20)};
  flex-direction: column;
  padding: 0 ${getRem(20)};
`;

const DeleteUserInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${getRem(10)};
  padding-right: ${getRem(20)};
`;

const DeleteUserInfoText = styled(Text.Span)``;
