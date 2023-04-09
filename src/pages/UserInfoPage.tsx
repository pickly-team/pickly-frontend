import { useNavigate } from 'react-router-dom';
import UserProfileInfo from '@/user/ui/UserProfileInfo';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import { useGETUserInfoQuery } from '@/user/api/user';
import { useEffect } from 'react';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  // API에 따라서
  const { data: userInfoData } = useGETUserInfoQuery({ userId: '1', mode });

  const [name, onChangeElementName, onChangeName] = useHandleInput();
  const [nickname, onChangeElementNickname, onChangeNickname] =
    useHandleInput();

  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen } =
    useChangeEmoji();

  useEffect(() => {
    if (userInfoData) {
      onChangeName(userInfoData.name);
      onChangeNickname(userInfoData.nickname);
      onChangeEmoji(userInfoData.emoji);
    }
  }, [userInfoData]);

  const router = useNavigate();

  // TODO : POST API 연동
  const onClickSaveButton = () => {
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
      onChangeEmoji={onChangeEmoji}
      setEmojiBSOpen={setEmojiBSOpen}
      onChangeName={onChangeElementName}
      onChangeNickname={onChangeElementNickname}
      onClickSaveButton={onClickSaveButton}
    />
  );
};

export default UserInfoPage;
