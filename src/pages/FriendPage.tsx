import Header from '@/common-ui/Header/Header';
import Friends from '@/friend/ui/Friends';
import { Suspense } from 'react';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';
import IconButton from '@/common/ui/IconButton';
import { useNavigate } from 'react-router-dom';
import { navigatePath } from '@/constants/navigatePath';

const FriendPage = () => {
  const router = useNavigate();
  return (
    <>
      <Header
        title={'친구 목록'}
        rightButton={
          <IconButton
            name="search"
            size="m"
            onClick={() => router(navigatePath.FRIEND_SEARCH)}
          />
        }
      />
      <Suspense
        fallback={[1, 2, 3].map((item) => (
          <FriendSkeletonItem key={item} />
        ))}
      >
        <Friends />
      </Suspense>
    </>
  );
};

export default FriendPage;
