import UserProfileInfo from '@/user/ui/UserProfileInfo';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import { FormEventHandler, useEffect, useState } from 'react';
import useAuthStore from '@/store/auth';
import { usePutUserInfoQuery } from '@/user/api/user';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  const { userInfo, memberId } = useAuthStore();

  const [name, onChangeElementName, onChangeName] = useHandleInput();
  const [nickname, onChangeElementNickname, onChangeNickname] =
    useHandleInput();

  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen } =
    useChangeEmoji();

  // TODO : 이게 최선의 방법인지 고민해보기
  const [initialValues, setInitialValues] = useState({
    name: '',
    nickname: '',
    emoji: '',
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (userInfo) {
      const { name, nickname, profileEmoji } = userInfo;
      onChangeName(name);
      onChangeNickname(nickname);
      onChangeEmoji(profileEmoji);
      setInitialValues({ name, nickname, emoji: profileEmoji });
    }
  }, [userInfo]);

  useEffect(() => {
    const {
      name: initialName,
      nickname: initialNickname,
      emoji: initialEmoji,
    } = initialValues;
    if (
      name === initialName &&
      nickname === initialNickname &&
      emoji === initialEmoji
    ) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [name, nickname, emoji, initialValues]);

  const { mutate } = usePutUserInfoQuery({ mode, memberId });

  const onSubmitUserInfo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      putData: {
        name,
        nickname,
        profileEmoji: emoji,
      },
      memberId,
    });
  };

  // TODO : FIREBASE 연동 후 수정
  const email = 'wshmin1234@gmail.com';

  return (
    <UserProfileInfo
      emoji={emoji}
      name={name}
      email={email}
      nickname={nickname}
      isEmojiBSOpen={isEmojiBSOpen}
      buttonDisabled={disabled}
      mode={mode}
      onChangeEmoji={onChangeEmoji}
      setEmojiBSOpen={setEmojiBSOpen}
      onChangeName={onChangeElementName}
      onChangeNickname={onChangeElementNickname}
      onSubmit={onSubmitUserInfo}
    />
  );
};

export default UserInfoPage;
