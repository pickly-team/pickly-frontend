import Header from '@/common-ui/Header/Header';
import BlockMemberList from '@/members/ui/BlockMemberList';
import MemberSkeleton from '@/members/ui/MemberSkeleton';
import { Suspense } from 'react';

const BlockUserListPage = () => {
  return (
    <>
      <Header showBackButton title="차단 목록" />
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, idx) => (
          <MemberSkeleton key={idx} />
        ))}
      >
        <BlockMemberList />
      </Suspense>
    </>
  );
};

export default BlockUserListPage;
