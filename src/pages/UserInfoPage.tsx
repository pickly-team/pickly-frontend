import React, {
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import useAuthStore from '@/store/auth';
import { usePutUserInfoQuery } from '@/user/api/user';
import { 특수문자_제거, 특수문자_확인 } from '@/utils/check';
import useToast from '@/common-ui/Toast/hooks/useToast';
import Header from '@/common-ui/Header/Header';
import BottomFixedButton from '@/common-ui/BottomFixedButton';
import UserProfileInfo from '@/user/ui/UserProfileInfo';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  // FIRST RENDER
  const { userInfo, memberId } = useAuthStore();
  const { fireToast } = useToast();

  // USER INTERACTION
  // 1. 이름, 닉네임, 이모지 변경
  const [name, onChangeElementName, setName] = useHandleInput();
  const [nickname, onChangeElementNickname, setNickname] = useHandleInput();
  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen, closeEmojiBS } =
    useChangeEmoji();

  const [initialValues, setInitialValues] = useState({
    name: '',
    nickname: '',
    emoji: '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => initializeUserInfo(), [userInfo, mode]);
  useEffect(() => checkFormStatus(), [name, nickname, emoji, initialValues]);

  const initializeUserInfo = useCallback(() => {
    if (!userInfo) return;

    const { name, nickname, profileEmoji } = userInfo;
    if (mode === 'CREATE') setNickname('');
    if (mode === 'EDIT') setNickname(nickname);

    setName(name);
    onChangeEmoji(profileEmoji);
    setInitialValues({ name, nickname, emoji: profileEmoji });
  }, [userInfo, mode]);

  // 2. 유저 정보 수정
  const checkFormStatus = useCallback(() => {
    const isNicknameEmpty = !nickname;
    const isNoChange =
      name === initialValues.name &&
      nickname === initialValues.nickname &&
      emoji === initialValues.emoji;

    setDisabled(isNicknameEmpty || isNoChange);
  }, [name, nickname, emoji, initialValues]);

  const { mutate } = usePutUserInfoQuery({ mode, memberId });

  const onSubmitUserInfo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({ putData: { name, nickname, profileEmoji: emoji }, memberId });
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickName = e.target.value;
    // 비어있을 경우 특수문자 확인하지 않음
    if (!e.target.value.length) {
      onChangeElementNickname(e);
      setNickname('');
      return;
    }

    if (특수문자_확인(newNickName)) {
      onChangeElementNickname(e);
      return;
    }

    fireToast({
      message: '앗! 닉네임에는 특수문자를 사용할 수 없어요',
      mode: 'ERROR',
    });
    setNickname(특수문자_제거(newNickName));
  };

  return (
    <>
      <Header showBackButton={mode === 'EDIT'} />
      <UserProfileInfo onSubmit={onSubmitUserInfo}>
        <UserProfileInfo.EmojiSelector
          emoji={emoji}
          isEmojiBSOpen={isEmojiBSOpen}
          closeEmojiBS={closeEmojiBS}
          onChangeEmoji={onChangeEmoji}
          setEmojiBSOpen={setEmojiBSOpen}
        />
        <UserProfileInfo.EditBoxGroup
          name={name}
          nickname={nickname}
          onChangeName={onChangeElementName}
          onChangeNickname={handleNicknameChange}
        />
        {mode === 'EDIT' && <UserProfileInfo.DeleteUserInfo />}
      </UserProfileInfo>
      <BottomFixedButton
        activeButtonColor="lightGreen"
        buttonColor="buttonGreen"
        type="submit"
        disabled={disabled}
      >
        {mode === 'CREATE' ? '회원가입' : '수정하기'}
      </BottomFixedButton>
    </>
  );
};

export default UserInfoPage;
