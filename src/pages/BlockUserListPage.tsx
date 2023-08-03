import Header from '@/common-ui/Header/Header';
import BlockMemberList from '@/members/ui/BlockMemberList';
import MemberSkeleton from '@/members/ui/MemberSkeleton';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';
import { Suspense } from 'react';

const BlockUserListPage: ActivityComponentType = () => {
  return (
    <AppScreen preventSwipeBack>
      <Header showBackButton title="차단 목록" />
      <Suspense
        fallback={Array.from({ length: 5 }).map((_, idx) => (
          <MemberSkeleton key={idx} />
        ))}
      >
        <BlockMemberList />
      </Suspense>
    </AppScreen>
  );
};

export default BlockUserListPage;
