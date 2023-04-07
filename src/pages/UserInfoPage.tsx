import { useNavigate } from 'react-router-dom';
import useHandleUserInfo from '../user/service/useHandleUserInfo';
import UserProfileInfo from '@/user/ui/UserProfileInfo';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  // TODO : PR 반영 후 수정

  const { name, nickname, emoji, onChangeName, onChangeNickname } =
    useHandleUserInfo({
      mode,
    });

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
      onChangeEmoji={() => {}}
      onChangeName={onChangeName}
      onChangeNickname={onChangeNickname}
      onClickSaveButton={onClickSaveButton}
    />
  );
};

export default UserInfoPage;
