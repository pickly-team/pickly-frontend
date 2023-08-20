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

  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen, closeEmojiBS } =
    useChangeEmoji();

  // TODO : 백엔드 수정 후 수정
  const { mutate } = usePutUserInfoQuery({ mode: 'CREATE', memberId });

  useEffect(() => {
    if (userInfo) {
      if (userInfo.nickname === '' && memberId) {
        mutate({
          putData: {
            name: userInfo.name || '피클리123',
            nickname: 'oxo' + generateRandomString(4),
            profileEmoji: userInfo.profileEmoji ?? '🐶',
          },
          memberId,
        });
      }
    }
  }, [userInfo, memberId]);

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
      // TODO : 백엔드 수정 후 수정
      const changeName = name.includes('피클리123') ? '' : name;
      const changeNickName = nickname.includes('oxo') ? '' : nickname;

      onChangeName(changeName);
      onChangeNickname(changeNickName);
      onChangeEmoji(profileEmoji);
      setInitialValues({
        name: changeName,
        nickname: changeNickName,
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

// TODO : 백엔드 수정 후 수정
const generateRandomString = (num: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
