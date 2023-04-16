import { useNavigate } from 'react-router-dom';
import UserProfileInfo from '@/user/ui/UserProfileInfo';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import { useGETUserInfoQuery } from '@/user/api/user';
import { FormEventHandler, useEffect, useState } from 'react';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  const router = useNavigate();
  const { data: userInfoData } = useGETUserInfoQuery({ userId: '1', mode });

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
    if (userInfoData) {
      const { name, nickname, emoji } = userInfoData;
      onChangeName(name);
      onChangeNickname(nickname);
      onChangeEmoji(emoji);
      setInitialValues({ name, nickname, emoji });
    }
  }, [userInfoData]);

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
    router(-1);
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
      onChangeEmoji={onChangeEmoji}
      setEmojiBSOpen={setEmojiBSOpen}
      onChangeName={onChangeElementName}
      onChangeNickname={onChangeElementNickname}
      onSubmit={onSubmitUserInfo}
    />
  );
};

export default UserInfoPage;
