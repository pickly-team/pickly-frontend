import { useNavigate } from 'react-router-dom';
import UserProfileInfo from '@/user/ui/UserProfileInfo';
import useChangeEmoji from '@/common/service/useChangeEmoji';
import useHandleInput from '@/common/service/useHandleInput';
import { useGETUserInfoQuery } from '@/user/api/user';

interface UserCreatePageProps {
  mode: Mode;
}

const UserInfoPage = ({ mode }: UserCreatePageProps) => {
  // API에 따라서
  const { data: userInfoData } = useGETUserInfoQuery({ userId: '1', mode });

  const [name, onChangeName] = useHandleInput({
    input: mode === 'EDIT' ? userInfoData?.name ?? '' : '',
  });
  const [nickname, onChangeNickname] = useHandleInput({
    input: mode === 'EDIT' ? userInfoData?.nickname ?? '' : '',
  });

  const { emoji, isEmojiBSOpen, onChangeEmoji, setEmojiBSOpen } =
    useChangeEmoji({
      emoji: mode === 'EDIT' ? userInfoData?.emoji ?? '📖' : '📖',
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
      isEmojiBSOpen={isEmojiBSOpen}
      onChangeEmoji={onChangeEmoji}
      setEmojiBSOpen={setEmojiBSOpen}
      onChangeName={onChangeName}
      onChangeNickname={onChangeNickname}
      onClickSaveButton={onClickSaveButton}
    />
  );
};

export default UserInfoPage;
