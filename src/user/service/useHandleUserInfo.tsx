import React, { useEffect } from 'react';
import { useGETUserInfoQuery } from '../api/user';

interface EditUserInfo {
  mode: 'EDIT' | 'CREATE';
}

const useHandleUserInfo = ({ mode }: EditUserInfo) => {
  const { data: userData } = useGETUserInfoQuery({ userId: '1', mode });

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setNickname(userData.nickname);
    }
  }, [userData]);

  const [name, setName] = React.useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [nickname, setNickname] = React.useState('');
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const [emoji, setEmoji] = React.useState('😾');
  const onChangeEmoji = (emoji: string) => {
    setEmoji(emoji);
  };

  return {
    emoji,
    name,
    nickname,
    onChangeEmoji,
    onChangeName,
    onChangeNickname,
  };
};

export default useHandleUserInfo;
