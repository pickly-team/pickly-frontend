import BlockMemberList from '@/widgets/members/ui/BlockMemberList';
import MemberSkeleton from '@/widgets/members/ui/MemberSkeleton';
import { Header } from '@pickly/design-system';
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
