import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase';

export const signInGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  // The signed-in user info.
  const user = result.user;
  const token = await user.getIdTokenResult();

  return { token: token, user };
};
