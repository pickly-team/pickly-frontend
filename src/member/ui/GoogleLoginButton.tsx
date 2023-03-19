import Button from '@/common-ui/Button';
import { signInGoogle } from '@/member/api/auth';
import { useState } from 'react';

const GoogleLoginButton = () => {
  const [token, setToken] = useState('');
  const onClickLogin = async () => {
    const result = await signInGoogle();
    setToken(result.token.token);
  };
  return (
    <>
      <Button onClick={onClickLogin}>Google Login</Button>
      {token && <div>Token : {token}</div>}
    </>
  );
};

export default GoogleLoginButton;
