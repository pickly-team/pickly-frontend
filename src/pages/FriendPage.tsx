import Header from '@/common-ui/Header/Header';
import Friends from '@/friend/ui/Friends';
import { Suspense } from 'react';
import FriendSkeletonItem from '@/friend/ui/FriendSkeletonItem';

const FriendPage = () => {
  return (
    <>
      <Header title={'친구 목록'} />
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
