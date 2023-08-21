import UserProfileInfo from '@/user/ui/UserProfileInfo';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import { FormEventHandler, useEffect, useState } from 'react';
import useAuthStore from '@/store/auth';
import { usePutUserInfoQuery } from '@/user/api/user';

const PREFIX = '-+@*' as const;

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  const { userInfo, memberId } = useAuthStore();

  const [name, onChangeElementName, onChangeName] = useHandleInput();
  const [nickname, onChangeElementNickname, onChangeNickname] =
    useHandleInput();

  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen, closeEmojiBS } =
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

      if (nickname.includes(PREFIX)) onChangeNickname('');
      else onChangeNickname(nickname);

      onChangeName(name);
      onChangeEmoji(profileEmoji);
      setInitialValues({
        name,
        nickname,
        emoji: profileEmoji,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    const {
      name: initialName,
      nickname: initialNickname,
      emoji: initialEmoji,
    } = initialValues;

    if (nickname.length === 0) {
      setDisabled(true);
      return;
    }

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

  const { mutate } = usePutUserInfoQuery({ mode: 'CREATE', memberId });

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

  return (
    <UserProfileInfo
      emoji={emoji}
      name={name}
      nickname={nickname}
      isEmojiBSOpen={isEmojiBSOpen}
      buttonDisabled={disabled}
      mode={mode}
      onChangeEmoji={onChangeEmoji}
      setEmojiBSOpen={setEmojiBSOpen}
      closeEmojiBS={closeEmojiBS}
      onChangeName={onChangeElementName}
      onChangeNickname={onChangeElementNickname}
      onSubmit={onSubmitUserInfo}
    />
  );
};

export default UserInfoPage;
