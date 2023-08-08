import BSDeleteConfirmation from '@/bookmarks/ui/Main/BSDeleteConfirmation';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import useBottomSheet from '@/common-ui/BottomSheet/hooks/useBottomSheet';
import Header from '@/common-ui/Header/Header';
import Text from '@/common-ui/Text';
import useWebview from '@/common/service/hooks/useWebview';
import Emoji from '@/common/ui/Emoji';
import EmojiSelect from '@/common/ui/EmojiSelect';
import { useDELETEUserInfoQuery } from '@/members/api/member';
import useAuthStore from '@/store/auth';
import EditBox from '@/user/ui/EditBox';
import getRem from '@/utils/getRem';
import styled from '@emotion/styled';
import { FormEvent } from 'react';

interface UserProfileInfoProps {
  emoji: string;
  name: string;
  nickname: string;
  isEmojiBSOpen: boolean;
  buttonDisabled: boolean;
  mode: Mode;
  setEmojiBSOpen: () => void;
  closeEmojiBS: () => void;
  onChangeEmoji: (emoji: string) => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserProfileInfo = ({
  emoji,
  name,
  nickname,
  isEmojiBSOpen,
  buttonDisabled,
  mode,
  setEmojiBSOpen,
  closeEmojiBS,
  onChangeEmoji,
  onChangeName,
  onChangeNickname,
  onSubmit,
}: UserProfileInfoProps) => {
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
    postMessage('signUp');
  };

  return (
    <Form onSubmit={onSubmit}>
      <Header showBackButton={mode === 'EDIT'} />
      <EmojiBackDrop onClick={closeEmojiBS}>
        <Emoji emoji={emoji} onClickEmoji={setEmojiBSOpen} />
        <StyleEditBox>
          <EditBox
            name="이름"
            value={name}
            onChange={onChangeName}
            isEssential
          />
          <EditBox
            name="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            isEssential
            withCount
          />
        </StyleEditBox>
        {mode === 'EDIT' && (
          <DeleteUserInfoWrapper>
            <DeleteUserInfoText
              onClick={openDeleteUserInfo}
              fontSize={0.8}
              color="grey600"
            >
              탈퇴하기
            </DeleteUserInfoText>
          </DeleteUserInfoWrapper>
        )}
        <BottomFixedButton
          activeButtonColor="lightGreen"
          buttonColor="buttonGreen"
          type="submit"
          disabled={buttonDisabled}
        >
          {mode === 'CREATE' ? '회원가입' : '수정하기'}
        </BottomFixedButton>
      </EmojiBackDrop>
      {isEmojiBSOpen && <EmojiSelect onChangeEmoji={onChangeEmoji} />}
      {mode === 'EDIT' && (
        <BSDeleteConfirmation
          open={deleteUserInfoBS}
          onClose={closeDeleteUserInfo}
          onDelete={onClickDeleteUserInfo}
          mainText="정말로 탈퇴할까요?"
          subText="탈퇴하면 다시 복구할 수 없습니다. 탈퇴하시겠습니까?"
          buttonText="탈퇴"
        />
      )}
    </Form>
  );
};

export default UserProfileInfo;

const Form = styled.form``;

const EmojiBackDrop = styled.div`
  position: absolute;
  top: ${getRem(60)};
  left: 0;
  width: 100%;
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
